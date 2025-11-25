import { test, expect } from "@playwright/test"

test.describe("Booking - GetBookingIds", () => {

    test("Validar listagem de ids com Sucesso", async ({ request }) => {
        const response = await request.get("/booking")

        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBeGreaterThan(0)
        expect(body[0]).toHaveProperty("bookingid")
        expect(typeof body[0].bookingid).toBe("number")
    })

    test("Validar listagem de ids por primeiro nome com sucesso", async ({ request }) => {
        const firstname = "Mary"
        const response = await request.get(`/booking?firstname=${firstname}`)

        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(3)
        expect(body[0]).toHaveProperty("bookingid")
        expect(typeof body[0].bookingid).toBe("number")
    })

    test("Validar listagem de ids por último nome com sucesso", async ({ request }) => {
        const lastname = "Wilson"
        const response = await request.get(`/booking?lastname=${lastname}`)

        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(2)
        expect(body[0]).toHaveProperty("bookingid")
        expect(typeof body[0].bookingid).toBe("number")
    })

    test("Validar listagem de ids por primeiro e último nome com sucesso", async ({ request }) => {
        const firstname = "Mary"
        const lastname = "Wilson"
        const response = await request.get(`/booking?firstname=${firstname}&&lastname=${lastname}`)

        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(Array.isArray(body)).toBeTruthy();
        expect(body.length).toBe(1)
        expect(body[0]).toHaveProperty("bookingid")
        expect(typeof body[0].bookingid).toBe("number")
    })

})