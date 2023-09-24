import { rest } from "msw";

const baseURL = "https://tudu.herokuapp.com/";

export const handlers = [
  rest.get(`${baseURL}dj-rest-auth/user/`, (req, res, ctx) => {
    return res(
      ctx.json({
        "pk": 2,
        "username": "Martha",
        "email": "",
        "first_name": "",
        "last_name": "",
        "profile_id": 2,
        "profile_image": "https://res.cloudinary.com/dmg2ncvzm/image/upload/v1/media/../default_user_zaxugw.png"
        })
    );
  }),
  rest.post(`${baseURL}dj-rest-auth/logout/`, (req, res, ctx) => {
    return res(ctx.status(200));
  }),
];