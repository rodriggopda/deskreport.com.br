import { Palette, Building2, CreditCard, Truck, Plus, Save } from 'lucide-react';

export function CompanyHub() {
  const activeOrg = { name: "Empresa Exemplo", slug: "empresa-exemplo" };

  return (
    <div className="space-y-12 animate-slide-up pb-10">
      {/* HEADER INFORMATIVO */}
      <div className="border-b border-neutral-200 dark:border-neutral-800 pb-6">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-white flex items-center gap-2 mb-2">
          Identidade e Dados da Empresa
        </h2>
        <p className="text-sm text-neutral-500 max-w-2xl">
          Gerencie o nome, identidade visual, faturamento e logística da sua marca. Essas informações são usadas para personalizar seus catálogos e pedidos.
        </p>
      </div>

      <div className="space-y-12 animate-slide-up pb-10">
        {/* IDENTIDADE VISUAL */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Aparência e URL</h3>
              <p className="text-xs text-neutral-500">Configure a logo oficial e as cores base da sua vitrine.</p>
            </div>
            <button className="bg-sky-500 hover:bg-sky-600 focus:ring-2 focus:ring-sky-500/50 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
              <Save size={16} />
              Salvar Alterações
            </button>
          </div>
          <div className="bg-transparent">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Logo do Catálogo</label>
                <div className="border-2 border-dashed border-neutral-200 dark:border-neutral-800 rounded-xl p-8 flex flex-col items-center justify-center gap-3 hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors cursor-pointer group">
                  <div className="p-3 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400 dark:text-neutral-500 group-hover:scale-110 transition-transform">
                    <Plus size={24} />
                  </div>
                  <span className="text-xs text-neutral-500">Formato PNG ou SVG</span>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Nome da Empresa</label>
                  <input type="text" defaultValue={activeOrg?.name || ''} className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all font-semibold" />
                </div>
                <div className="space-y-4">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Cores da Marca</label>
                  <div className="flex gap-4">
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-xl bg-sky-500 shadow-lg border-2 border-white dark:border-neutral-800" />
                      <span className="text-[10px] text-center font-bold text-neutral-500">Primária</span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="w-12 h-12 rounded-xl bg-neutral-800 dark:bg-neutral-200 shadow-lg border-2 border-white dark:border-neutral-800" />
                      <span className="text-[10px] text-center font-bold text-neutral-500">Acento</span>
                    </div>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Slug da Empresa (URL)</label>
                  <div className="flex">
                    <span className="bg-neutral-100 dark:bg-neutral-800 px-3 py-2.5 rounded-l-lg border border-r-0 border-neutral-200 dark:border-neutral-700 text-[10px] font-bold text-neutral-500 flex items-center whitespace-nowrap">deskreport.com.br/</span>
                    <input type="text" defaultValue={activeOrg?.slug || ''} className="flex-1 bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded-r-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 font-mono" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* DADOS DA EMPRESA */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Faturamento e Cadastro</h3>
              <p className="text-xs text-neutral-500 mt-1">Dados empresariais para recibos e notas fiscais.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-4">
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Razão Social</label>
              <input type="text" defaultValue="MODA BRASIL DISTRIBUIDORA LTDA" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">CNPJ</label>
              <input type="text" defaultValue="12.345.678/0001-99" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">Endereço de Faturamento</label>
              <input type="text" defaultValue="Av. Paulista, 1000 - Bela Vista, São Paulo - SP" className="w-full bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 rounded-lg px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-sky-500 transition-all" />
            </div>
          </div>
        </div>

        {/* MEIOS DE PAGAMENTO */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Meios de Pagamento</h3>
              <p className="text-xs text-neutral-500 mt-1">Defina quais formas de pagamento seu cliente pode usar.</p>
            </div>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <PaymentToggle icon="P" name="Pix Direto" active />
              <PaymentToggle icon="C" name="Cartão de Crédito" active />
              <PaymentToggle icon="B" name="Boleto Bancário" />
            </div>
          </div>
        </div>

        {/* LOGÍSTICA E ENTREGAS */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between border-b border-neutral-200 dark:border-neutral-800 pb-4">
            <div>
              <h3 className="font-semibold text-neutral-900 dark:text-white text-lg">Entregas e Logística</h3>
              <p className="text-xs text-neutral-500 mt-1">Configurações de frete para seus produtos físicos.</p>
            </div>
          </div>
          <div className="py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-neutral-500">C</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Correios (PAC/SEDEX)</span>
                    <span className="text-[10px] text-neutral-500">Cálculo automático de frete</span>
                  </div>
                </div>
                <div className="w-10 h-5 bg-sky-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800/50 rounded-xl border border-neutral-200 dark:border-neutral-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex items-center justify-center font-bold text-neutral-500">R</div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-neutral-800 dark:text-neutral-100">Retirada no Local</span>
                    <span className="text-[10px] text-neutral-500">Sem custo de frete</span>
                  </div>
                </div>
                <div className="w-10 h-5 bg-sky-500 rounded-full relative cursor-pointer shadow-inner">
                  <div className="absolute right-0.5 top-0.5 w-4 h-4 rounded-full bg-white shadow-sm" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PaymentToggle({ icon, name, active = false }: { icon: string, name: string, active?: boolean }) {
  return (
    <div className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${active ? 'bg-sky-50 dark:bg-sky-900/10 border-sky-200 dark:border-sky-800' : 'bg-neutral-50 dark:bg-neutral-800/30 border-neutral-200 dark:border-neutral-800'
      }`}>
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-black text-lg ${active ? 'bg-sky-500 text-white' : 'bg-neutral-200 dark:bg-neutral-700 text-neutral-500'
        }`}>
        {icon}
      </div>
      <div className="flex flex-col flex-1">
        <span className={`text-sm font-bold ${active ? 'text-sky-700 dark:text-sky-400' : 'text-neutral-500'}`}>{name}</span>
        <span className="text-[10px] text-neutral-400 uppercase tracking-tighter">{active ? 'Ativado' : 'Desativado'}</span>
      </div>
      <div className={`w-2 h-2 rounded-full ${active ? 'bg-sky-500 shadow-[0_0_8px_rgba(14,165,233,0.5)]' : 'bg-neutral-300 dark:bg-neutral-600'}`} />
    </div>
  )
}
