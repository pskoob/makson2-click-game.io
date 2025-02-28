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
      localStorage.setItem('hasAutoClicker', data.hasAutoClicker)
      localStorage.setItem('upgradeLevel', data.upgradeLevel)
      localStorage.setItem('clickCount', data.clickCount)
      


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

async function saveProgress() {

    const progressData = {
        Progress: {
          tg_id: getTelegramUserId(),
          clickCount: localStorage.getItem('clickCount'),
          upgradeLevel: localStorage.getItem('upgradeLevel'),
          hasAutoClicker: localStorage.getItem('hasAutoClicker')
        }
      };

    try {
      const response = await fetch("http://localhost:8000/save_progress", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(progressData)
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log("Progress saved successfully:", data);
      // You can handle the response data as needed
  
    } catch (error) {
      console.error("Ошибка при сохранении прогресса:", error);
      // Handle the error as needed, e.g., show a message to the user
    }
  }

