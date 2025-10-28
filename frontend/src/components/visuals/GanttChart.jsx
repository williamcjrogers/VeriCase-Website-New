export const GanttChart = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
      <div className="font-bold text-lg pb-4 mb-6 text-gray-900 border-b border-gray-200">
        Schedule Integration (Baseline vs Actual)
      </div>

      {/* Gantt Chart Visual */}
      <div className="space-y-4">
        {/* Header Row */}
        <div className="grid grid-cols-12 gap-2 text-xs font-medium text-gray-500">
          <div className="col-span-3">Activity</div>
          <div className="col-span-9 grid grid-cols-9 text-center">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
            <span>Aug</span>
            <span>Sep</span>
          </div>
        </div>

        {/* Activity Rows */}
        <div className="space-y-3">
          {/* Activity 1 */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 text-sm text-gray-700">Foundation</div>
            <div className="col-span-9">
              <div className="relative h-12">
                <div className="absolute top-0 left-0 h-5 bg-gray-300 rounded" style={{ width: '30%', marginLeft: '0%' }}></div>
                <div className="absolute bottom-0 left-0 h-5 bg-teal-500 rounded" style={{ width: '35%', marginLeft: '0%' }}></div>
              </div>
            </div>
          </div>

          {/* Activity 2 */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 text-sm text-gray-700">Structure</div>
            <div className="col-span-9">
              <div className="relative h-12">
                <div className="absolute top-0 left-0 h-5 bg-gray-300 rounded" style={{ width: '25%', marginLeft: '25%' }}></div>
                <div className="absolute bottom-0 left-0 h-5 bg-teal-500 rounded" style={{ width: '30%', marginLeft: '28%' }}>
                  <div className="absolute -right-2 top-1/2 -translate-y-1/2 text-xs bg-red-500 text-white px-2 py-1 rounded">
                    Delay
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Activity 3 */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 text-sm text-gray-700">MEP Install</div>
            <div className="col-span-9">
              <div className="relative h-12">
                <div className="absolute top-0 left-0 h-5 bg-gray-300 rounded" style={{ width: '20%', marginLeft: '45%' }}></div>
                <div className="absolute bottom-0 left-0 h-5 bg-teal-500 rounded" style={{ width: '25%', marginLeft: '50%' }}></div>
              </div>
            </div>
          </div>

          {/* Activity 4 */}
          <div className="grid grid-cols-12 gap-2 items-center">
            <div className="col-span-3 text-sm text-gray-700">Finishes</div>
            <div className="col-span-9">
              <div className="relative h-12">
                <div className="absolute top-0 left-0 h-5 bg-gray-300 rounded" style={{ width: '25%', marginLeft: '60%' }}></div>
                <div className="absolute bottom-0 left-0 h-5 bg-teal-500 rounded" style={{ width: '20%', marginLeft: '70%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 pt-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-300 rounded"></div>
            <span className="text-gray-600">Baseline Schedule</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-teal-500 rounded"></div>
            <span className="text-gray-600">Actual Progress</span>
          </div>
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-6 p-4 bg-teal-50 rounded-lg">
        <p className="text-sm text-teal-700">
          <strong>Linked Evidence & Delay Tags (AI):</strong>
        </p>
        <div className="flex items-center gap-2 mt-2">
          <span className="text-xs bg-white px-2 py-1 rounded border border-teal-200">Delay Tag 28k Condition</span>
          <span className="text-xs bg-white px-2 py-1 rounded border border-teal-200">Delay: Pipe Clashes</span>
        </div>
      </div>
    </div>
  );
};
