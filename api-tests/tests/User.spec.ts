import {expect, test} from '@playwright/test';

const userId = 12;
const data = {
    "name": "John",
    "job": "CEO"
};

test.describe("User tests", () => {
    test("Create user test", async ({request}) => {
        await request.post(`/api/users`, {
            data: data
        }).then(async res => {
            expect(res.status()).toEqual(201);
            const body = await res.json();
            expect(body.job).toEqual(data.job);
            expect(body.name).toEqual(data.name);
            expect(body).toHaveProperty("createdAt");
            expect(body).toHaveProperty("id");
        })
    });
    test("Get user test", async ({request}) => {
        await request.get(`/api/users/${userId}`).then(async res => {
            expect(res.status()).toEqual(200);
            const body = await res.json();
            expect(body.data).toEqual(
                {
                    "avatar": "https://reqres.in/img/faces/12-image.jpg",
                    "email": "rachel.howell@reqres.in",
                    "first_name": "Rachel",
                    "id": 12,
                    "last_name": "Howell"
                }
            );
        })
    });
    test("Update user by Patch method", async ({request}) => {
        await request.patch(`/api/users/${userId}`, {
            data: data
        }).then(async res => {
            expect(res.status()).toEqual(200);
            const body = await res.json();
            expect(body.job).toEqual(data.job);
            expect(body.name).toEqual(data.name);
            expect(body).toHaveProperty("updatedAt");
        })
    });

    test("Update user by Put method", async ({request}) => {
        await request.put(`/api/users/${userId}`, {
            data: data
        }).then(async res => {
            expect(res.status()).toEqual(200);
            const body = await res.json();
            expect(body.job).toEqual(data.job);
            expect(body.name).toEqual(data.name);
            expect(body).toHaveProperty("updatedAt");
        })
    });

    test("DELETE User by Id", async ({request}) => {
        await request.delete(`/api/users/${userId}`, {
            data: data
        }).then(async res => {
            expect(res.status()).toEqual(204);
        })
    });
})