import { createContext, useState, useContext, ReactNode } from "react";

interface BondContextData {
    bondData: any;
    setBondData: React.Dispatch<any>;
  }

  const BondContext = createContext<BondContextData | null>(null);


//componente de provedor para fornecer os dados do vínculo
export const BondProvider = ({ children } : { children: ReactNode } ) => {
    const [bondData, setBondData] = useState<any>(null);

    return (
        <BondContext.Provider value={{ bondData, setBondData }}>
            {children}
        </BondContext.Provider>
    );
};

// Crie um hook personalizado para usar o contexto
export const useBond = () => {
    const context = useContext(BondContext);
    if (!context) {
        throw new Error("useBond must be used within a BondProvider");
    }
    return context;
};