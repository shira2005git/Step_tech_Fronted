
// פונקציה לקבלת כל המשתמשים
async function fetchUsers() {
    try {
        const response = await fetch('http://localhost:3333/getNameSemMail');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const users = await response.json();
        updateTable(users);
    } catch (error) {
        console.error('Error fetching users:', error);
    }
}

// פונקציה לעדכון הטבלה ב-HTML
function updateTable(users) {
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.innerHTML = ''; // ננקה את הטבלה קודם
    users.forEach((user, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${user.name}</td>
            <td>${user.seminar}</td>
            <td>${user.email}</td>
            <td>
                <button class="update" onclick="updetUser('${user.name}')">עדכון</button>
                <button class="delete" onclick="deleteUser('${user.name}')">מחיקה</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchUsers();
});

// פונקציה למחיקת משתמש
async function deleteUser(name) {
    const password = prompt("הכנס סיסמת משתמש או סיסמת ניהול");

    if (!password) {
        alert("לא הוזנה סיסמה");
        return;
    }

    try {
        const response = await fetch('http://localhost:3333/deleteUserById', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);

        // אם נדרש, עדכן את הטבלה או עשה פעולה אחרת כאן
        fetchUsers(); // לדוגמה, לעדכן את הטבלה לאחר מחיקה
    } catch (error) {
        console.error('Error deleting user:', error);
        alert('שגיאה במחיקת המשתמש');
    }
}




// פונקציה לעדכון משתמש
async function updetUser(name) {
    alert("שימי לב: ❣️ שם המשתמש יחודי ואינו ניתן לשינוי");
    
    // קבלת נתונים מהמשתמש
    const enterPassword = prompt("הכנסי סיסמת משתמש או סיסמת מנהל");
    const seminar = prompt("הכניסי סמינר לעדכון");
    const email = prompt("הכניסי מייל לעדכון");
    const password = prompt("הכניסי סיסמא לעדכון");

    try {
        // שליחת הנתונים לשרת
        const response = await fetch('http://localhost:3333/updateUser', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, password, seminar, email, enterPassword }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        alert(result.message);

        // אם נדרש, עשה משהו לאחר העדכון
        fetchUsers(); // לדוגמה, לעדכן את הטבלה לאחר שינוי
    } catch (error) {
        console.error('Error updating user:', error);
        alert('שגיאה בעדכון המשתמש');
    }
    
}
