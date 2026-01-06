export const companyDetails = {
  name: process.env.NEXT_PUBLIC_COMPANY_NAME || "Alfa Industrial Products",
  address: process.env.NEXT_PUBLIC_CONTACT_ADDRESS || "Secunderabad, Telangana",
  phone: {
    primary: process.env.NEXT_PUBLIC_CONTACT_PHONE_PRIMARY || "+91-9849323052",
    secondary:
      process.env.NEXT_PUBLIC_CONTACT_PHONE_SECONDARY || "+91-4065213052",
  },
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "abbasalfa@yahoo.com",
  whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "919849323052",
  baseUrl: process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000",
};

// Social links or other global constants can go here
export const socialLinks = {
  whatsapp: `https://wa.me/${companyDetails.whatsapp}`,
};
