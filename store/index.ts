import { defineStore } from 'pinia'
export const useMainStore = defineStore('main', {
    state: () => ({
        contacts: [] as any[],
    }),
    actions: {
       setContact(contact: any) {
        console.log(contact.jid);
        
        let isUser  = this.contacts.filter(da => da.jid == contact.jid)
        // console.log(isUser.le);
        
        if(!isUser.length) {
            this.contacts = [ ...this.contacts, contact]
        }
        
       }
    },
    getters: {
        getCotact(): any {
            return this.contacts;
        }
    },
    
})