 import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import OrderSummary from "@/app/(customer)/bookings/summary/order-summary";
import { toast } from "sonner";
import {createCheckoutSession} from "@/app/(customer)/bookings/summary/summary.action";

// Mock the Stripe checkout session creation
jest.mock("@/lib/stripe", () => ({
  createCheckoutSession: jest.fn(),
}));

describe("OrderSummary", () => {
  const mockReservation = {
    id: "reservation-id",
    totalAmount: 100,
    seats: [
      {
        id: "seat-id",
        seatType: {
          name: "Standard",
          description: "Standard seat",
          Pricing: [{ routeId: "route-id", amount: 50 }],
        },
        bookedSeats: 2,
        crossing: {
          boat: {
            name: "Boat Name",
            imageUrl: "boat-image-url",
          },
          route: {
            id: "route-id",
            departurePort: "Port A",
            arrivalPort: "Port B",
          },
          departureTime: new Date(),
        },
      },
    ],
    userId: "user-id",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a checkout session and redirect to the checkout URL", async () => {
    (createCheckoutSession as jest.Mock).mockResolvedValueOnce({
      url: "https://checkout.stripe.com/test",
    });

    render(<OrderSummary reservation={mockReservation} />);

    const button = screen.getByRole("button", { name: /Proceed to checkout/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(window.location.href).toMatch(/checkout.stripe.com/);
    });
  });

  it("should show an error toast if checkout session creation fails", async () => {
    (createCheckoutSession as jest.Mock).mockRejectedValueOnce(
      new Error("Checkout session creation failed")
    );
    jest.spyOn(toast, "error");

    render(<OrderSummary reservation={mockReservation} />);

    const button = screen.getByRole("button", { name: /Proceed to checkout/i });
    fireEvent.click(button);

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        "Checkout session creation failed"
      );
    });
  });
});
