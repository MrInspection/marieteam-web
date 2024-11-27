import "@testing-library/jest-dom";
import {POST} from "@/app/api/webhooks/route";
import {stripe} from "@/lib/stripe";

jest.mock('stripe', () => {
  stripe;
})

describe("/api/webhooks", () => {
  it("It should return a 400 if the signature is missing", async () => {
    const { req } = jest.requireActual("next/server").createMocks({
      method: "POST",
      body: 'sample-body',
    })

    const response = await POST(req as Request)
    expect(response.status).toBe(400);
    const jsonResponse = await response.json();
    expect(jsonResponse.ok).toBe(false);
  });
})
