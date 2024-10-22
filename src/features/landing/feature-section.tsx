import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function FeatureSection() {
    const features = [
        {
            title: "Various Destinations",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        },
        {
            title: "Everything Is Included",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        },
        {
            title: "Affordable Price",
            description: "Travelling is a wonderful way to explore new places, learn about different cultures and gain unique experiences."
        }
    ];

    return (
        <section className="w-full py-12 md:py-24 lg:py-32">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold text-center text-gray-800 py-12">Sail the World, Discover Its Secrets</h2>
                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <Card key={index} className="bg-white shadow-md transition-transform duration-500 ease-in-out transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="text-xl font-semibold text-gray-700">{feature.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-600">{feature.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
}