const secret  = process.env.JWT_SECRET;

if (!secret) {
  console.error(`Missing env variable JWT_SECRET`);
  process.exit(1);
}

const output = JSON.stringify({
  "key":  secret,
  "type": "HS256",
  "audience": ["goodcity"],
  "issuer": "goodcity"
});

console.log(output);