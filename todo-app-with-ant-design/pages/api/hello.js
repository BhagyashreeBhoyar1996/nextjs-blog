// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default (req, res) => {
  res.status(200).json({ name: "John Doe" });
};

export async function getAllTask() {
  const url = `https://api-nodejs-todolist.herokuapp.com/task`;
  const headers = {
    Authorization:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MDlkMDkzZmZhMzk2MDAwMTcwYjhlNDUiLCJpYXQiOjE2MjA5MDQyNTV9.Hu2rPtq0Al950JQ-3x8UoxTclWYwCQ85OMmlSzgyYR4",
    "Content-Type": "application/json",
  };
  const result = await fetch(url, { headers });
  return await result.json();
}
