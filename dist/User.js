export class User {
    id;
    firstName;
    lastName;
    server;
    username;
    constructor(id, firstName, lastName, server, username) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.server = server;
        this.username = username;
    }
    getId() {
        return this.id;
    }
    getUsername() {
        return this.username;
    }
    getFirstName() {
        return this.firstName;
    }
    getLastName() {
        return this.lastName;
    }
    getServer() {
        return this.server;
    }
    sendMessage(message) {
        throw new Error("Method not implemented.");
    }
}
//# sourceMappingURL=User.js.map