import {Badge} from "@/components/ui/badge";

export default function NotSignedIn() {
    return (
        <main className="flex-grow flex items-center justify-center mx-auto">
            <div className="container mx-auto px-4">
                <div className="max-w-md mx-auto text-center">
                    <Badge variant="outline" className="text-sm mb-4">404</Badge>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                        You are not logged in
                    </h3>
                    <p className="text-muted-foreground mb-6">
                        This page requires you to be logged in to view it. If you&apos;re experiencing issues, please contact support.
                    </p>
                </div>
            </div>
        </main>
    );
}