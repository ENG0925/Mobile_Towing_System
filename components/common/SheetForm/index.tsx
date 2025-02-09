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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type Type = "text" | "email" | "number" | "description" | "select" | "date";

interface Field {
    label: string;
    type: Type;
    name: string;
    options?: { label: string; value: string | boolean | number }[]; // Only for "select" type
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
            } else if (field.type === "select") {
                validation = z.string().min(1, `${field.label} is required`);
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

                {/* Scrollable form container */}
                <div className="max-h-[85vh] overflow-y-auto p-2">
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
                                                ) : field.type === "select" && field.options ? (
                                                    <Select
                                                        onValueChange={(value) => formField.onChange(value)}
                                                        value={formField.value}
                                                        disabled={isLoading}
                                                    >
                                                        <SelectTrigger>
                                                            <SelectValue placeholder={`Select ${field.label}`} />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {field.options.map((option) => (
                                                                <SelectItem
                                                                    key={option.value.toString()}
                                                                    value={option.value.toString()}
                                                                >
                                                                    {option.label}
                                                                </SelectItem>
                                                            ))}
                                                        </SelectContent>
                                                    </Select>
                                                ) : (
                                                    <Input
                                                        {...formField}
                                                        type={field.type === "number" ? "text" : field.type}
                                                        onChange={(e) => {
                                                            const value = e.target.value;
                                                            if (field.type === "number") {
                                                                let inputValue = e.target.value;

                                                                inputValue = inputValue.replace(/[^\d.]/g, "");
                                        
                                                                const parts = inputValue.split(".");
                                                                if (parts.length > 1) {
                                                                  inputValue = `${parts[0]}.${parts[1].slice(0, 2)}`;
                                                                }
                                        
                                                                formField.onChange(inputValue);
                                                            } else {
                                                                formField.onChange(value);
                                                            }
                                                        }}
                                                        value={formField.value}
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
                </div>
            </SheetContent>

        </Sheet>
    );
};

export default SheetForm;
