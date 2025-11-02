
let userExists = false;

async function send() {
    const name = document.getElementById("name").value;
    const pass = document.getElementById("pass").value;
    
    const userData = {
        name: name,
        password: pass
    };

    try {
        const response = await fetch('http://localhost:3333/putSign_up', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            // אם התגובה מהשרת לא בסדר, תציג שגיאה
            userExists = false;
            alert("User not found");
            return;
        }

        // נסה לפרש את התגובה כ-JSON
        const result = await response.json();
        userExists = true; // אם הגעת לכאן, המשתמש קיים
        // alert("User exists: " + JSON.stringify(result));

    } catch (error) {
        console.error('Error:', error);
        alert("Error occurred while sending request");
        return;
    }

    // אם המשתמש לא קיים, סיים את הפונקציה
    if (!userExists) {
        alert("המשתמש לא קיים במערכת");
        return;
    }

    // הוספת הפוסט לפורום
    const text = document.getElementById("text").value;
    // alert(text);

    const newPost = {
        name: name,
        post: text
    };

    try {
        const response = await fetch('http://localhost:3333/addPost', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newPost)
        });

        if (!response.ok) {
            throw new Error('Failed to add post');
        }

        const data = await response.json();
        console.log('Success:', data);
        // alert("תגובתך נוספה בהצלחה");

    } catch (error) {
        console.error('Error:', error);
        alert("תגובתך נכשלה - שגיאה 404, בעיה בהתחברות לשרת");
    }

    getForum();
    // window.location.href='foroom1.html'
}





//פונקציה שמדפיסה את כל הפורום
// async function getForum() {
//     try {
//         const response = await fetch('http://localhost:3333/getAllPost', {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json'
//             }
//         });

//         if (!response.ok) {
//             throw new Error('Failed to fetch posts');
//         }

//         const posts = await response.json();
//         console.log('Posts:', posts); // הדפסת הפוסטים לקונסול

//         // הצגת הפוסטים בעמוד
//         displayPosts(posts);

//     } catch (error) {
//         console.error('Error:', error);
//         alert('Error occurred while fetching posts');
//     }
// }

// function displayPosts(posts) {
//     const postsContainer = document.getElementById('postsContainer');
//     postsContainer.innerHTML = ''; // נקה את התוכן הקיים

//     posts.forEach(post => {
//         const postElement = document.createElement('div');
//         postElement.className = 'post';
//         postElement.innerHTML = `
//             <h3>${post.name}</h3>
//             <p>${post.post}</p>
//         `;
//         postsContainer.appendChild(postElement);
//     });
// }


async function getForum() {
    try {
        const response = await fetch('http://localhost:3333/getAllPost', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }

        const posts = await response.json();
        console.log('Posts:', posts);

        displayPosts(posts);

    } catch (error) {
        console.error('Error:', error);
        alert('Error occurred while fetching posts');
    }
}

function formatDate(date) {
    const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        // second: '2-digit',
        hour12: false
    };
    return new Date(date).toLocaleDateString('en-GB', options);
}

function displayPosts(posts) {
    const postsContainer = document.getElementById('postsContainer');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <h3>👤${post.name}</h3>
            <p>⏱️${formatDate(post.createdAt)}</p>
            <h4>${post.post}</h4>
            <button onclick="deletePost('${post._id}', prompt('Enter admin password:'))">מחק פוסט</button>
            <br></br>
            <br></br>
        `;
        postsContainer.appendChild(postElement);
    });
}


//פונקציה למחיקת פוסט עי קוד מנהל
async function deletePost(postId, password) {
    try {
        const response = await fetch('http://localhost:3333/delete_post', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ postId, password })
        });

        if (!response.ok) {
            throw new Error('Failed to delete post');
        }

        const result = await response.json();
        console.log('Success:', result);
        alert("הפוסט נמחק בהצלחה");
        getForum(); // רענן את הפוסטים לאחר המחיקה

    } catch (error) {
        console.error('Error:', error);
        alert("מחיקת הפוסט נכשלה");
    }
}









    






















