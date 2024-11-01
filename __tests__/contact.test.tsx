import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import ContactPage from "@/app/(customer)/contact/page";

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))


describe('Page', () => {
    it('renders a heading', () => {
        render(<ContactPage />)

        const heading = screen.getByText('Contact Us')

        expect(heading).toBeInTheDocument()
    })
})