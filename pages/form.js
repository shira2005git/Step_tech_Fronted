
async function send()
{
    name=document.getElementById("name").value
    console.log(name)

    email=document.getElementById("email").value
    console.log(email)

    sem=document.getElementById("sem").value
    console.log(sem)

    pass=document.getElementById("pass").value
    console.log(pass)

    if(!isStrongPassword(pass))
    {
        alert("הסיסמא לא תקינה")
        return
    }

        

    if(!name || !email || !pass || !sem)
    {
        alert("אחד או יותר מהשדות ריקים")
        return
    }

    //check uniqe name 
    if(await checkUserExists(name)===true)
    {
        alert("שם משתמש תפוס, נסה שם אחר")
        return
    }



        const userData = {
            name: name,
            email: email,
            seminar: sem,
            password: pass
        };

    
        fetch('http://localhost:3333/postSign_in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            alert("ההרשמה הצליחה")
            // טיפול בתגובה מוצלחת
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("ההרשמה נכשלה")
            // טיפול בשגיאות
        });
    }
    


    async function checkUserExists(username) {
        try {
            const response = await fetch('http://localhost:3333/checkUserExists', { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: username }),
            });
    
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
    
            // מחזיר true אם המשתמש קיים, אחרת מחזיר false
            return data.exists;
        } catch (error) {
            console.error('Error:', error);
            return false; // מחזיר false במקרה של שגיאה
        }
    }
    
 
    //פונקציה שבודקת אם הסיסמא חזקה
    function isStrongPassword(password) {
        // בדיקת אורך מינימלי של 8 תווים
        if (password.length < 8) {
            return false
        }
        
        // בדיקת קיום תו אלפביתי
        if (!/[a-zA-Z]/.test(password)) {
            return false
        }
    
        // בדיקת קיום תו מספרי
        if (!/[0-9]/.test(password)) {
            return false
        }
    
        // בדיקת קיום תו מיוחד
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            return false
        }

        return true
    }
    
    




  