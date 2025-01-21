import React, { Dispatch, SetStateAction, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetClose,
} from "@/components/ui/sheet";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Type = "text" | "email" | "number" | "description";

interface Field {
    label: string;
    type: Type;
    name: string;
}

interface SheetSheetFormProps {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    title: string;
    description: string;
    onSubmit: (data: any) => void;
    fields: Field[];
    fetchData?: () => Promise<any>; // Optional API function
    isLoading?: boolean; // Optional loading state
}

const SheetForm: React.FC<SheetSheetFormProps> = ({
    open,
    setOpen,
    title,
    description,
    onSubmit,
    fields,
    fetchData,
    isLoading = false
}) => {
    // Create dynamic schema based on fields
    const generateFormSchema = (fields: Field[]) => {
        const schemaFields: Record<string, z.ZodTypeAny> = {};
    
        fields.forEach((field) => {
            let validation: z.ZodTypeAny;
    
            if (field.type === "email") {
                validation = z.string().email("Invalid email address");
            } else if (field.type === "number") {
                validation = z
                    .number({
                        required_error: `${field.label} is required`,
                        invalid_type_error: "Must be a number",
                    })
                    .refine((val) => !isNaN(val), "Must be a valid number");
            } else {
                validation = z.string().min(1, `${field.label} is required`);
            }
    
            schemaFields[field.name] = validation;
        });
    
        return z.object(schemaFields);
    };

    const formSchema = generateFormSchema(fields);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: fields.reduce((acc, field) => {
            acc[field.name] = "";
            return acc;
        }, {} as Record<string, string>),
    });

    // Fetch and set data when the sheet opens
    useEffect(() => {
        const loadData = async () => {
            if (open && fetchData) {
                try {
                    const data = await fetchData();
                    // Update form with fetched data
                    Object.keys(data).forEach((key) => {
                        if (fields.some(field => field.name === key)) {
                            form.setValue(key, data[key]);
                        }
                    });
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
        };

        loadData();
    }, [open, fetchData, form, fields]);

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        onSubmit(data);
        form.reset();
        setOpen(false);
    };

    return (
        <Sheet open={open} onOpenChange={setOpen}>
            <SheetContent>
                <SheetHeader>
                    <SheetTitle>{title}</SheetTitle>
                    <SheetDescription>{description}</SheetDescription>
                    <SheetClose onClick={() => setOpen(false)} />
                </SheetHeader>
                
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4 mt-4">
                        {fields.map((field, index) => (
                            <FormField
                                key={index}
                                control={form.control}
                                name={field.name}
                                render={({ field: formField }) => (
                                    <FormItem>
                                        <FormLabel>{field.label}</FormLabel>
                                        <FormControl>
                                            {field.type === "description" ? (
                                                <Textarea
                                                    {...formField}
                                                    className="resize-none"
                                                    disabled={isLoading}
                                                />
                                            ) : (
                                                <Input
                                                    {...formField}
                                                    type={field.type}
                                                    disabled={isLoading}
                                                />
                                            )}
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        ))}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? "Loading..." : "Submit"}
                        </Button>
                    </form>
                </Form>
            </SheetContent>
        </Sheet>
    );
};

export default SheetForm;