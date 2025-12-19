import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { HeadlessProductCard } from "@/components/headless/HeadlessProductCard"
import type { Product } from "@/lib/supabase"

/**
 * EDITABLE UI COMPONENT - ProductCardUI
 * 
 * Este componente solo maneja la presentación del ProductCard.
 * Toda la lógica viene del HeadlessProductCard.
 * 
 * PUEDES MODIFICAR LIBREMENTE:
 * - Colores, temas, estilos
 * - Textos e idioma
 * - Layout y estructura visual
 * - Animaciones y efectos
 * - Agregar features visuales (hover effects, etc.)
 */

interface ProductCardUIProps {
  product: Product
}

export const ProductCardUI = ({ product }: ProductCardUIProps) => {
  return (
    <HeadlessProductCard product={product}>
      {(logic) => (
        <Card className="bg-card border-border hover:shadow-lg transition-all duration-300 group">
          <CardContent className="p-4">
            <Link to={`/products/${logic.product.slug}`} className="block">
              <div className="aspect-square bg-muted rounded-lg mb-3 overflow-hidden relative group-hover:scale-105 transition-transform duration-300">
                {(logic.matchingVariant?.image || (logic.product.images && logic.product.images.length > 0)) ? (
                  <img
                    src={(logic.matchingVariant?.image as any) || logic.product.images![0]}
                    alt={logic.product.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Sin imagen
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {logic.discountPercentage && (
                    <span className="bg-destructive text-destructive-foreground text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">
                      -{logic.discountPercentage}%
                    </span>
                  )}
                  {logic.product.featured && (
                    <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">
                      Destacado
                    </span>
                  )}
                  {!logic.inStock && (
                    <span className="bg-muted text-muted-foreground text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">
                      Agotado
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-foreground font-semibold text-base mb-1 line-clamp-2">
                {logic.product.title}
              </h3>
              {logic.product.description && (
                <p className="text-muted-foreground text-xs mb-3 line-clamp-2">
                  {logic.product.description.replace(/<[^>]*>/g, '')}
                </p>
              )}
            </Link>

            {logic.hasVariants && logic.options && (
              <div className="mb-3 space-y-2">
                {logic.options.map((opt) => (
                  <div key={opt.id}>
                    <div className="text-xs font-semibold text-foreground mb-1 uppercase tracking-wide">{opt.name}</div>
                    <div className="flex flex-wrap gap-2">
                      {opt.values.filter(val => logic.isOptionValueAvailable(opt.name, val)).map((val) => {
                        const isSelected = logic.selected[opt.name] === val
                        const swatch = opt.name.toLowerCase() === 'color' ? opt.swatches?.[val] : undefined

                        if (swatch) {
                          return (
                            <button
                              key={val}
                              type="button"
                              onClick={() => logic.handleOptionChange(opt.name, val)}
                              title={`${opt.name}: ${val}`}
                              className={`h-6 w-6 rounded-full border ${
                                logic.selected[opt.name] && !isSelected ? 'opacity-40' : ''
                              }`}
                              style={{ 
                                backgroundColor: swatch, 
                                borderColor: '#e5e7eb'
                              }}
                              aria-label={`${opt.name}: ${val}`}
                            />
                          )
                        }

                        return (
                          <button
                            key={val}
                            type="button"
                            onClick={() => logic.handleOptionChange(opt.name, val)}
                            className={`border rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                              isSelected 
                                ? 'border-primary bg-primary text-primary-foreground' 
                                : logic.selected[opt.name] && !isSelected
                                  ? 'border-border bg-background text-muted-foreground opacity-40'
                                  : 'border-border bg-background text-foreground hover:border-primary'
                            }`}
                            aria-pressed={isSelected}
                            aria-label={`${opt.name}: ${val}`}
                            title={`${opt.name}: ${val}`}
                          >
                            {val}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-foreground font-bold text-lg">
                  {logic.formatMoney(logic.currentPrice)}
                </span>
                {logic.currentCompareAt && logic.currentCompareAt > logic.currentPrice && (
                  <span className="text-muted-foreground text-sm line-through">
                    {logic.formatMoney(logic.currentCompareAt)}
                  </span>
                )}
              </div>
              <Button
                size="sm"
                onClick={() => {
                  logic.onAddToCartSuccess()
                  logic.handleAddToCart()
                }}
                disabled={!logic.canAddToCart}
                className="bg-primary text-primary-foreground hover:bg-primary/90 disabled:opacity-50 rounded-full px-6 font-medium"
              >
                {logic.inStock ? 'Seleccionar opciones' : 'Agotado'}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </HeadlessProductCard>
  )
}