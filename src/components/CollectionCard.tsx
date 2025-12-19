import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { type Collection } from '@/lib/supabase'

interface CollectionCardProps {
  collection: Collection
  onViewProducts: (collectionId: string) => void
}

export const CollectionCard = ({ collection, onViewProducts }: CollectionCardProps) => {
  return (
    <Card className="bg-card border-border overflow-hidden hover:shadow-xl transition-all duration-300 group cursor-pointer">
      <CardContent className="p-0" onClick={() => onViewProducts(collection.id)}>
        <div className="aspect-[4/3] bg-muted overflow-hidden">
          {collection.image ? (
            <img 
              src={collection.image} 
              alt={collection.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground text-sm">
              Sin imagen
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-foreground font-bold text-xl line-clamp-1 uppercase tracking-tight">
              {collection.name}
            </h3>
            {collection.featured && (
              <span className="bg-accent text-accent-foreground text-xs px-2 py-1 rounded-md font-bold uppercase tracking-wide">
                Destacado
              </span>
            )}
          </div>
          
          {collection.description && (
            <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
              {collection.description}
            </p>
          )}
          
          <Button 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 rounded-full font-medium"
          >
            Ver Productos
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}