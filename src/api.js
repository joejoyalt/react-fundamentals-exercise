const inMemoryJobTitles = [
  "Foresters",
  "Biochemist",
  "Food scientist",
  "Animal geneticist",
  "Farmer",
  "Wildlife biologist",
  "Horticulturist",
  "Plant nursery attendant",
  "Agriculture teacher",
  "Plant biologist",
  "Wildlife inspector",
  "Soil and plant scientist",
  "Beekeeper",
  "Aquatic ecologist",
  "Conservationist",
  "Veterinarian",
  "Zoologist",
  "Groomer",
  "Animal control officer",
  "Kennel attendant",
  "Pet walker",
  "Animal sitter",
  "Animal shelter manager",
  "Veterinary assistant",
  "Animal nutritionist",
  "Biologist",
  "Wildlife rehabilitator",
  "Breeder",
  "Veterinary pathologist",
  "Veterinary ophthalmologist",
  "Project manager",
  "Sales manager",
  "Actuary",
  "Business teacher",
  "Business reporter",
  "Admissions representative",
  "Office manager",
  "Office clerk",
  "Assistant buyer",
  "Business development manager",
  "Salon manager",
  "Makeup artist",
  "Nail technician",
  "Message therapist",
  "Barber",
  "Beautician",
  "Skin care specialist",
  "Fashion designer",
  "Esthetician",
  "Electrologist",
  "Cosmetology instructor",
  "Hairdresser",
  "Fashion show stylist",
  "Spa manager",
  "Wedding stylist",
  "Call center agent",
  "Client services coordinator",
  "Technical support representative",
  "Virtual assistant",
  "Customer care associate",
  "Retail sales associate",
  "Cashier",
  "Concierge",
  "Customer service manager",
  "Help desk assistant",
  "Account coordinator",
  "Service adviser",
  "Bank teller",
  "Front desk coordinator",
  "Client services manager",
  "Art director",
  "Graphic designer",
  "Writer",
  "Editor",
  "Illustrator",
  "Public relations specialist",
  "Actor",
  "Singer",
  "Producer",
  "Web developer",
  "Architect",
  "Multimedia animator",
  "Painter",
  "Tattoo artist",
  "Dancer",
  "English teacher",
  "College professor",
  "Tutor",
  "Test scorer",
  "Test administrator",
  "Assistant professor",
  "Principal",
  "Superintendent",
  "Vice principal",
  "Substitute teacher",
  "Librarian",
  "Math teacher",
  "Science teacher",
  "Instructional designer",
  "Guidance counselor",
  "Civil engineer",
  "Mechanical engineer",
  "Chemical engineer",
  "Biological engineer",
  "Nuclear engineer",
  "Aerospace engineer",
  "Electrical engineer",
  "Environmental engineer",
  "Geological engineer",
  "Marine engineer",
  "Petroleum engineer",
  "Safety engineer",
  "Product engineer",
  "Compliance engineer",
  "Senior process engineer",
  "Financial planner",
  "Financial adviser",
  "Budget analyst",
  "Credit analyst",
  "Financial services representative",
  "Financial manager",
  "Cost estimator",
  "Loan officer",
  "Investment banking analyst",
  "Financial auditor",
];

let inMemoryAttendants = [];

export const getJobTitles = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: inMemoryJobTitles,
      });
    }, 2000);
  });

export const getAttendants = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        status: 200,
        data: inMemoryAttendants,
      });
    }, 2000);
  });

export const addAttendant = (attendant) =>
  new Promise((resolve) => {
    console.log(attendant)
    setTimeout(() => {
      inMemoryAttendants = [...inMemoryAttendants, attendant];

      resolve({ status: 200 });
    }, 2000);
  });
