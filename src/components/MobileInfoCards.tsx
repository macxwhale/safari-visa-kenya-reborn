
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, FileText, ArrowRight } from 'lucide-react';

export const MobileInfoCards: React.FC = () => {
  const cards = [
    {
      icon: Clock,
      title: "Processing Time",
      description: "Most applications are processed within 72 hours",
      detail: "Fast approval",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: Users,
      title: "Who Can Apply",
      description: "Citizens from eligible countries can apply online",
      detail: "Check eligibility",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: FileText,
      title: "Required Documents",
      description: "Passport, photo, and basic travel information",
      detail: "Document list",
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Mobile-optimized section header */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Everything You Need to Know
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Quick information about the eTA application process
          </p>
        </div>

        {/* Mobile-first grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
              <CardContent className="p-6 sm:p-8 text-center">
                {/* Icon with mobile-optimized sizing */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${card.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <card.icon className={`w-8 h-8 ${card.color}`} />
                </div>

                {/* Content with mobile-optimized typography */}
                <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-4">
                  {card.title}
                </h3>
                
                <p className="text-base text-muted-foreground mb-6 leading-relaxed">
                  {card.description}
                </p>

                {/* Mobile-friendly CTA */}
                <Button 
                  variant="brand-ghost" 
                  className="w-full sm:w-auto group-hover:bg-brand-green group-hover:text-white transition-all duration-300"
                >
                  {card.detail}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mobile CTA section */}
        <div className="text-center mt-12">
          <Button asChild variant="brand" size="xl" className="w-full sm:w-auto">
            <a href="/apply" className="flex items-center justify-center gap-2">
              Start Your Application
              <ArrowRight className="w-5 h-5" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};
