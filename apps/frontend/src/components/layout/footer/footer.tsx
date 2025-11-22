import { Container } from '../container/container';

/**
 * Footer Component
 * Site footer with links and copyright
 */
export function Footer() {
  return (
    <footer className="mt-auto border-t bg-white">
      <Container>
        <div className="py-8">
          <div className="grid gap-8 md:grid-cols-3">
            {/* About */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Acerca de</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Sobre Mercado Libre
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Investor relations
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Tendencias
                  </a>
                </li>
              </ul>
            </div>

            {/* Help */}
            <div>
              <h3 className="mb-4 font-semibold text-gray-900">Ayuda</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Comprar
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Vender
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-secondary-500">
                    Resolución de problemas
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
