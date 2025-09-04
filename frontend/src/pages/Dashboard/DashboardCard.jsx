import { Receipt, Package, ShoppingCart, Users } from 'lucide-react';

const DashboardCards = ({ statsCards }) => {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
      {statsCards.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div 
            key={index} 
            className="bg-white rounded-lg p-4 lg:p-6 relative shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <p className="text-xs font-semibold text-gray-700 mb-2">
                  {stat.title}
                </p>
                
                <div className="flex items-baseline space-x-2">
                    <p className={`text-lg lg:text-xl font-semibold text-black leading-none mb-1 ${stat.strikethrough ? 'line-through' : ''}`}>
                        {stat.value}
                    </p>
                     <span className="text-green-600 font-semibold text-xs bg-green-50 px-2 py-1 rounded-md">
                        {stat.change}
                    </span>
                </div>

                <p className="text-xs text-gray-400">
                  {stat.subtitle}
                </p>
              </div>
              <div className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-200 bg-gray-50">
                <Icon className="w-4 h-4 text-gray-500" />
              </div>
               
            </div>

          </div>
        );
      })}
    </section>
  );
};

export default DashboardCards;