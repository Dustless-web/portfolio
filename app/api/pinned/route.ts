import { NextResponse } from 'next/server';

const GITHUB_GRAPHQL = `query($login:String!, $first:Int!) {
  user(login:$login) {
    pinnedItems(first:$first, types:[REPOSITORY]) {
      nodes {
        ... on Repository {
          name
          description
          stargazerCount
          primaryLanguage { name }
          repositoryTopics(first:3) { nodes { topic { name } } }
          url
        }
      }
    }
  }
}`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const login = process.env.GITHUB_USERNAME || 'Dustless-web';

  if (!token) {
    // No token = cannot query pinned repos via GraphQL. Return empty list and a message.
    return NextResponse.json(
      { pinned: [], message: 'GITHUB_TOKEN not configured on the server.' },
      { status: 200, headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } }
    );
  }

  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query: GITHUB_GRAPHQL, variables: { login, first: 6 } }),
    });

    if (!res.ok) {
      const text = await res.text();
      return NextResponse.json({ pinned: [], error: text }, { status: 502 });
    }

    const json = await res.json();
    const nodes = json?.data?.user?.pinnedItems?.nodes || [];

    const pinned = nodes.map((repo: any) => ({
      name: repo.name,
      description: repo.description || 'No description provided.',
      stars: repo.stargazerCount ?? 0,
      tags: [repo.primaryLanguage?.name, ...(repo.repositoryTopics?.nodes || []).map((n: any) => n.topic?.name)].filter(Boolean),
      color: repo.primaryLanguage?.name ? 'text-green' : 'text-green',
      url: repo.url,
    }));

    return NextResponse.json(pinned, { status: 200, headers: { 'Cache-Control': 's-maxage=60, stale-while-revalidate=30' } });
  } catch (err) {
    return NextResponse.json({ pinned: [], error: String(err) }, { status: 500 });
  }
}
