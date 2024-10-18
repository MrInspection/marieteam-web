"use client"

export function ConfigureTripForm() {
    return (
        <>
            <div className={"grid grid-cols-3 gap-4"}>
                <div className={"border-2 col-span-2 rounded-2xl px-4 py-3 flex items-center justify-between"}>

                </div>

                <div className={"border-2 rounded-2xl px-4 py-3 flex items-center justify-between"}>
                    <div>
                        <h1 className={"font-medium"}>Adulte</h1>
                        <p className={"text-muted-foreground text-sm"}>Passager de plus de 18 ans</p>
                    </div>
                    <p className={"bg-blue-700/15 text-blue-500 rounded-lg px-2 py-1 w-fit text-sm font-medium"}>80
                        €</p>
                </div>


            </div>
        </>
    )
}
