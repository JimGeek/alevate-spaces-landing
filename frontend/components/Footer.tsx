import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export function Footer() {
    return (
        <footer id="contact" className="py-12 border-t border-white/5 bg-[#050505]">
            <div className="container px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-12">
                    <div className="text-center md:text-left">
                        <h3 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">Ready to Elevate?</h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                            Join us in reshaping the future of construction and living.
                        </p>

                        <div className="space-y-2 text-muted-foreground">
                            <p className="flex items-center gap-2 justify-center md:justify-start hover:text-primary transition-colors cursor-pointer">
                                <span className="font-semibold text-white">Email:</span> contact@alevate.space
                            </p>
                            <p className="flex items-center gap-2 justify-center md:justify-start hover:text-primary transition-colors cursor-pointer">
                                <span className="font-semibold text-white">Phone:</span> +91 86900 62814
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-center md:items-end gap-6">
                        <div className="flex gap-4">
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5">
                                <Linkedin size={20} />
                            </a>
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5">
                                <Twitter size={20} />
                            </a>
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all border border-white/5">
                                <Facebook size={20} />
                            </a>
                        </div>
                        <div className="text-right text-sm text-muted-foreground/60">
                            <p>Proudly built in <span className="text-white hover:text-primary transition-colors cursor-default">Vadodara, Gujarat</span>.</p>
                            <p className="mt-1 flex items-center justify-end gap-2">
                                Make in India 🇮🇳
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-muted-foreground/40">© 2025 Alevate Spaces Pvt Ltd. All rights reserved.</p>
                    <div className="flex gap-6 text-sm text-muted-foreground/40">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
