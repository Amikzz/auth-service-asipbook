import axios from "axios";

const BASE_URL = "http://localhost:4001/auth";

const generateRandomEmail = () => `testuser_${Date.now()}@example.com`;

async function testEndpoints() {
  const email = generateRandomEmail();
  const password = "password123";

  console.log(`Starting API Tests...`);
  console.log(`Generated Email: ${email}`);
  console.log("--------------------------------------------------");

  // 1. Test check-email (Should not exist)
  try {
    console.log(`\n[GET] ${BASE_URL}/check-email?email=${email}`);
    const res = await axios.get(`${BASE_URL}/check-email`, {
      params: { email },
    });
    console.log("Response:", res.data);
  } catch (err: any) {
    console.error("Error checking email:", err.response?.data || err.message);
  }

  // 2. Test store-company-user (Create New)
  const payload = {
    First_Name: "Test",
    Last_Name: "User",
    Email: email,
    Contact_No_01: "0771234567",
    Password: password,
    Name: "Test Company Ltd",
    Address: "123 Test St, Colombo",
    Company_Email: email,
    Company_Website: "www.testco.com",
    Company_Category_idCompany_Category: 1, // Assumed valid ID or null usage
  };

  try {
    console.log(`\n[POST] ${BASE_URL}/store-company-user`);
    console.log("Payload:", JSON.stringify(payload, null, 2));
    const res = await axios.post(`${BASE_URL}/store-company-user`, payload);
    console.log("Response:", res.data);
  } catch (err: any) {
    console.error(
      "Error creating user/company:",
      err.response?.data || err.message
    );
  }

  // 3. Test check-email (Should exist now)
  try {
    console.log(`\n[GET] ${BASE_URL}/check-email?email=${email}`);
    const res = await axios.get(`${BASE_URL}/check-email`, {
      params: { email },
    });
    console.log("Response:", res.data);
  } catch (err: any) {
    console.error(
      "Error checking email after creation:",
      err.response?.data || err.message
    );
  }
}

testEndpoints();
