var app = new Vue({
    el: '#app',
    data: {
        messages: [],
        newMessage: "",
        username: "",
        usernameEntered: false,

    },
    created:function() {
        db.collection("messages")
        .orderBy('date', 'asc')
        .onSnapshot(messagesCollection => {
            this.messages = [];
            messagesCollection.forEach(messageItem => {
                this.messages.push(messageItem.data());
            })
        })
    },
    methods: {
        enterNewMessage: function () {
            const newMessage= {
                username: this.username,
                message: this.newMessage,
                date: new Date(),
            }
            

            // this.messages.push(newMessage);
            this.addToFirestore(newMessage);
            this.newMessage = "";
        },
        addToFirestore: function (newMessage) {
            db.collection('messages')
             .add(newMessage)
             .then(function(documentId){
                console.log("Document has been inserted with id", documentId)
             })
             .catch(function(error){
                 console.log(error);
             })
        },
        showUsernameInput: function(usernameEntered) {
            this.usernameEntered = false;
            this.username="";
        },
    },
})


  