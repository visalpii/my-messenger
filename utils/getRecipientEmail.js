// Helper function to retrieve the email of recipient
const getRecipientEmail = (users, currentUser) => {
  const filteredArr = users.filter((user) => user !== currentUser.email);
  return filteredArr[0];
};

export default getRecipientEmail;
