async function fetchUserData() {

    const tg_id = getTelegramUserId();

if (userId) {
    console.log("Telegram User ID:", userId);
    // Use the user ID
} else {
    console.log("User ID not available.");
    // Handle the case where the user ID is not available
}



    try {
      const response = await fetch(`http://localhost:8000/get_user_progress/${tg_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(data.name);
      document.getElementById("user-name").textContent = data.name;
      localStorage.setItem('auto_clicker', data.auto_clicker)
      localStorage.setItem('click_booster', data.click_booster)
      localStorage.setItem('balance', data.coin_number)
      


    } catch (error) {
      console.error("Ошибка при получении данных пользователя:", error);
      document.getElementById("user-name").textContent = "Ошибка загрузки имени";
    }
  }

  function getTelegramUserId() {
    try {
        const webApp = Telegram.WebApp;
        const userId = webApp.initDataUnsafe?.user?.id;
        return userId || null; // Return userId if available, otherwise return null
    } catch (error) {
        console.error("Error getting Telegram user ID:", error);
        return null; // Return null if there's an error
    }
}

// Example Usage:
