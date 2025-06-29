"use client"

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { useEffect, useState } from "react";
import { defineEventType, definePropertyType, formatPrice } from "@/lib/utils";
import { Bath, BedDouble, Ruler } from "lucide-react";

const DynamicMap = dynamic(() => import('../../components/Map'), {
    loading: () => <p>Loading map...</p>,
    ssr: false
});

export default function PropiedadesPage() {
    const router = useRouter()
    const defaultPosition: [number, number] = [8.7504756, -75.8869262];
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        if (!router.isReady) return;
        const id = router.query.id as string;
        if (id) {
            const fetchProperty = async () => {
                try {
                    const response = await fetch(`/api/property`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ id }),
                    });
                    if (!response.ok) {
                        throw new Error('Error fetching property data');
                    }
                    const propertyData = await response.json();
                    setData(propertyData[0] || null);
                } catch (error) {
                    console.error('Failed to fetch property data:', error);
                }
            };
            fetchProperty();
        }
    }, [router.isReady, router.query.id]);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 bg-gray-50">
                <div className="container py-6 px-24">
                    <div className="block max-w-[70%]">
                        <div className="flex justify-between items-center mb-6 flex-wrap">
                            <div>
                                <div>
                                    <Breadcrumb>
                                        <BreadcrumbList>
                                            <BreadcrumbItem>
                                                Estás viendo:
                                            </BreadcrumbItem>
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/">{defineEventType(data?.type_service)}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/">{definePropertyType(data?.property_type)}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                            <BreadcrumbSeparator />
                                            <BreadcrumbItem>
                                                <BreadcrumbLink href="/">{definePropertyType(data?.property_type)} en {defineEventType(data?.type_service)} en {data?.street2}, {data?.city}</BreadcrumbLink>
                                            </BreadcrumbItem>
                                        </BreadcrumbList>
                                    </Breadcrumb>
                                </div>
                                <h1 className="text-2xl font-bold">{definePropertyType(data?.property_type)} en {defineEventType(data?.type_service)} en {data?.street2}, {data?.city}</h1>
                                <p className="text-muted-foreground">
                                    <span>Ubicacion:</span> <br />
                                    <span className="font-semibold">{data?.street2}, {data?.city}</span>
                                </p>
                            </div>
                        </div>

                        <div>
                            <div>
                                <img src="https://cdn2.infocasas.com.uy/repo/img/th.outside1527x221.685d5039b36f5_infocdn__a7c6d45a-f4e1-476e-ad0b-c9af9946afe6.jpeg" alt={data?.title} className="w-full h-[400px] rounded-lg mb-4" />
                            </div>

                            <div className="flex justify-between items-center mb-4">
                                <div className="flex gap-4 overflow-x-auto">
                                    <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <BedDouble className="text-2xl" />
                                        <span className="ml-2">{data?.num_bedrooms || 0} Habs.</span>
                                    </div>
                                    <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Bath className="text-2xl" />
                                        <span className="ml-2">{data?.num_bathrooms || 0} Baños.</span>
                                    </div>
                                    <div className="p-2 bg-gray-200 rounded-lg flex items-center justify-center">
                                        <Ruler className="text-2xl" />
                                        <span className="ml-2">{Number(data?.property_area) || 0} m²</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">
                                        {data?.sale_value_from > 0 && `${formatPrice(data.sale_value_from)}`}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {(data?.type_service === 'sale' || data?.type_service === 'sale_rent') && 'Precio de venta'}
                                    </p>
                                </div>
                                <div className="text-right">
                                    <p className="text-2xl font-bold">
                                        {data?.rent_value_from > 0 && ` ${formatPrice(data.rent_value_from)}`}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {(data?.type_service === 'rent' || data?.type_service === 'sale_rent') && 'Precio de arriendo'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-[40px]">
                            <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                            {data?.latitude && data?.longitude ? (
                                <DynamicMap position={[data.latitude, data.longitude]} zoom={13} />
                            ) : (
                                <DynamicMap position={defaultPosition} zoom={13} />
                            )}
                        </div>

                        <div className="mt-[40px]">
                            <h2 className="text-xl font-semibold mb-4">Detalles de la Propiedad</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="flex flex-col gap-2 text-muted-foreground">
                                    <div className="flex justify-between"><strong>Estrato:</strong> {definePropertyType(data?.property_type)}</div>
                                    <div className="flex justify-between"><strong>Estado:</strong> ¡Pregúntale!</div>
                                    <div className="flex justify-between"><strong>Área Construida:</strong> {Intl.NumberFormat('es-CO', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(data?.property_area) + ' m²' || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Antigüedad:</strong> {data?.property_age || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Parqueaderos:</strong> {(data?.common_parking ? 'Si' : 'No')}</div>
                                    <div className="flex justify-between"><strong>Piso N°:</strong> {data?.floor || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Acepta mascotas:</strong> {'¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Documentación requerida:</strong> {'¡Pregúntale!'}</div>
                                </div>
                                <div className="flex flex-col gap-2 text-muted-foreground">
                                    <div className="flex justify-between"><strong>Tipo de propiedad:</strong> {definePropertyType(data?.property_type)}</div>
                                    <div className="flex justify-between"><strong>Baños:</strong> {data?.num_bathrooms || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Área Privada:</strong> {data?.city}</div>
                                    <div className="flex justify-between"><strong>Habitaciones:</strong> {data?.num_bedrooms}</div>
                                    <div className="flex justify-between"><strong>Administración:</strong> {data?.administration || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Pisos interiones:</strong> {data?.short_description || '¡Pregúntale!'}</div>
                                    <div className="flex justify-between"><strong>Contrato Mínimo:</strong> {data?.short_description || '¡Pregúntale!'}</div>
                                </div>
                            </div>

                        </div>

                        <div className="mt-[40px]">
                            <h2 className="text-xl font-semibold mb-4">Descripción</h2>
                            <p className="text-muted-foreground">
                                {data?.observations || 'No hay descripción disponible para esta propiedad.'}
                            </p>
                        </div>
                    </div>
                    <div className="block max-w-[30%]"></div>
                </div>
            </main>
            <Footer />
        </div>
    )
}
