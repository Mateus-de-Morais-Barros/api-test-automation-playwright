import { test, expect } from '@playwright/test'

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

    test("Tentativa de criação de token com credenciais inválidas", async ({request})=>{
        const username = "usererrado"
        const password = "senhaerrada"
        const response = await request.post('/auth', {
            data: {
                username: username,
                password: password
            }
        })

        const body = await response.json()
        console.log((response))
        // expect(response.status()).toBe(401)
        expect(body).toHaveProperty("reason")
        expect(body.reason).toBe("Bad credentials")
    })

    test("Tentativa de criação de token com usuário inválido", async ({ request }) => {
        const username = "usererrado"
        const password = "password123"
        const response = await request.post('/auth', {
            data: {
                username: username,
                password: password
            }
        })

        const body = await response.json()
        console.log((response))
        // expect(response.status()).toBe(401)
        expect(body).toHaveProperty("reason")
        expect(body.reason).toBe("Bad credentials")
    })

    test("Tentativa de criação de token com senha inválida", async ({ request }) => {
        const username = "admin"
        const password = "senhaerrada"
        const response = await request.post('/auth', {
            data: {
                username: username,
                password: password
            }
        })

        const body = await response.json()
        console.log((response))
        // expect(response.status()).toBe(401)
        expect(body).toHaveProperty("reason")
        expect(body.reason).toBe("Bad credentials")
    })

    test("Tentativa de criação de token com redenciais em branco", async ({ request }) => {
        const username = ""
        const password = ""
        const response = await request.post("/auth", {
            data: {
                username: username,
                password: password
            }
        })

        const body = await response.json()

        // expect(response.status()).toBe(401)
        expect(body).toHaveProperty("reason")
        expect(body.reason).toBe("Bad credentials")    
    })

    test("Tentativa de criação de token com content-type incorreto", async ({ request }) => {
        const username = ""
        const password = ""
        const response = await request.post("/auth", {
            headers: {
                "Content-Type":"application/xml",
            },
            data: {
                username: username,
                password: password
            }
        })

        expect(response.status()).toBe(400)
    })
})
