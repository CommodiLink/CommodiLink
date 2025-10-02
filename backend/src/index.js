// TEMP: quick seed (remove after it runs once)
app.post("/seed", async (req, res) => {
  try {
    const company = await prisma.company.create({
      data: { name: "Acme Trading", type: "Broker" }
    });

    const user = await prisma.user.create({
      data: {
        email: "test@example.com",
        password: "demo",   // demo only
        role: "user"
      }
    });

    await prisma.listing.create({
      data: {
        companyId: company.id,
        title: "Crude Oil",
        commodity: "Oil",
        quantity: 1000,
        price: 78.5
      }
    });

    res.json({ seeded: true, company, user });
  } catch (e) {
    console.error(e);
    res.status(500).send("Seed failed");
  }
});
