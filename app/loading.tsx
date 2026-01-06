export default function Loading() {
  return (
    <div className="min-h-screen bg-base px-6 md:px-24 py-4 selection:bg-green selection:text-base">
      <div className="max-w-4xl mx-auto">
        
        {/* Navbar Skeleton */}
        <div className="flex justify-between items-center py-8 mb-8">
          <div className="w-12 h-6 bg-surface0/20 rounded animate-pulse"></div>
          <div className="hidden md:flex gap-6">
            <div className="w-16 h-4 bg-surface0/20 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-surface0/20 rounded animate-pulse"></div>
            <div className="w-16 h-4 bg-surface0/20 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Hero Section Skeleton */}
        <div className="mt-12 mb-20 space-y-6">
          <div className="w-3/4 md:w-1/2 h-12 bg-surface0/20 rounded animate-pulse"></div>
          <div className="space-y-3">
             <div className="w-full h-4 bg-surface0/20 rounded animate-pulse"></div>
             <div className="w-5/6 h-4 bg-surface0/20 rounded animate-pulse"></div>
          </div>
          <div className="flex gap-4 pt-4">
             <div className="w-20 h-4 bg-surface0/20 rounded animate-pulse"></div>
             <div className="w-20 h-4 bg-surface0/20 rounded animate-pulse"></div>
          </div>
        </div>

        {/* Cards Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12">
          {[1, 2].map((i) => (
            <div key={i} className="h-48 bg-mantle border border-surface0/20 rounded-xl p-6 relative overflow-hidden">
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface0/5 to-transparent animate-shimmer" style={{ transform: 'skewX(-20deg)' }}></div>
              
              <div className="flex justify-between items-start mb-4">
                 <div className="w-1/3 h-5 bg-surface0/30 rounded"></div>
                 <div className="w-8 h-8 bg-surface0/20 rounded-full"></div>
              </div>
              <div className="space-y-2">
                 <div className="w-full h-3 bg-surface0/20 rounded"></div>
                 <div className="w-2/3 h-3 bg-surface0/20 rounded"></div>
              </div>
              <div className="mt-8 flex gap-2">
                 <div className="w-12 h-4 bg-surface0/20 rounded"></div>
                 <div className="w-12 h-4 bg-surface0/20 rounded"></div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}