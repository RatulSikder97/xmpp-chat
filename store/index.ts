import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => ({
        contacts: [] as any[],
        message: [] as any[],
    }),
    actions: {
        setContact(contact: any) {
            console.log(contact.jid);

            let isUser = this.contacts.filter(da => da.jid == contact.jid)
            // console.log(isUser.le);

            if (!isUser.length) {
                this.contacts = [...this.contacts, contact]
            }

        },
        setActive(jid: any) {
            this.contacts.map(contact => {
                return contact.isActive = (contact.jid == jid)
            })
        },
        setMsg(msg: any) {
            this.message = [...this.message, msg]
        },
        getMessageByActiveUser(user: any): any {
            return this.message.filter(m => ((m.from == user && m.to == localStorage.getItem('username')?.split('/')[0]) || (m.to == user && m.from == localStorage.getItem('username')?.split('/')[0]) ))
        }
    },
    getters: {
        getCotact(): any {
            return this.contacts;
        },

        getActiveContact(): any {
            return this.contacts.filter(contact => { return contact.isActive })[0]
        },

        getAllMessage(): any {
            return this.message;
        }
    },

})