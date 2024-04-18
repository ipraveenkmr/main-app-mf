import { create } from 'zustand'
import { persist, createJSONStorage } 
from 'zustand/middleware'

const useAppStore = create(
  persist(
    (set, get) => ({
      userdata: {},
      count: 0,
      updateCount: (count) => 
          set({ count: count }),
      updateUserData: (userdata) => 
          set({ userdata: userdata }),
    }),
    {
      name: 'mfapp-storage', // name of the item in the storage (must be unique)
    //   storage: createJSONStorage(() => sessionStorage), 
    // (optional) by default, 'localStorage' is used
    },
  ),
)

export default useAppStore;