import { test, expect } from "@playwright/test"

test.describe("Booking - CreateBooking", () => {
    
    test("Validar criação de booking com sucesso", async ({ request }) => {        
        const response = await request.post("/booking", {
            headers: { "Content-Type": "application/json" },
            data: {
                firstname : "Jim",
                lastname : "Brown",
                totalprice : 111,
                depositpaid : true,
                bookingdates : {
                    checkin : "2018-01-01",
                    checkout : "2019-01-01"
                },
                additionalneeds : "Breakfast"
            }
        })
        
        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(body).not.toBeNull()
        expect(body).toHaveProperty("bookingid")
        expect(body.bookingid).not.toBeNull()
        expect(typeof body.bookingid).toBe("number")
    })
})