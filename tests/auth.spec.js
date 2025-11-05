import { test, expect } from '@playwright/test'
import { type } from 'os'

test.describe("Auth - CreateToken", () => {
    test("Validar criação de token com Sucesso", async ({ request })=>{
        const username = "admin"
        const password = "password123"
        const response = await request.post('/auth', {
            data: {
                username: username,
                password: password
            }
        })
        
        const body = await response.json()

        expect(response.ok()).toBeTruthy()
        expect(body).toHaveProperty('token')
        expect(typeof body.token).toBe('string')
        expect(body.token).not.toHaveLength(0)
    })
})
