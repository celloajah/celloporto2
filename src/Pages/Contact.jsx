import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    AOS.init({ once: false });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    Swal.fire({
      title: "Mengirim Pesan...",
      html: "Harap tunggu selagi kami mengirim pesan Anda",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    try {
      const formSubmitUrl = "https://formsubmit.co/marcellojulienmanik@gmail.com";

      const submitData = new FormData();
      submitData.append("name", formData.name);
      submitData.append("email", formData.email);
      submitData.append("message", formData.message);
      submitData.append("_subject", "Pesan Baru dari Website Portfolio");
      submitData.append("_captcha", "false");
      submitData.append("_template", "table");

      await axios.post(formSubmitUrl, submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda telah berhasil terkirim!",
        icon: "success",
        confirmButtonColor: "#ef4444",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } catch {
      Swal.fire({
        title: "Berhasil!",
        text: "Pesan Anda telah berhasil terkirim!",
        icon: "success",
        confirmButtonColor: "#ef4444",
        timer: 2000,
        timerProgressBar: true,
      });

      setFormData({ name: "", email: "", message: "" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="px-[5%] lg:px-[10%]">
      {/* HEADER */}
      <div className="text-center mt-10 mb-6">
        <h2
          data-aos="fade-down"
          className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text 
          bg-gradient-to-r from-red-500 via-rose-500 to-pink-500"
        >
          Hubungi Saya
        </h2>

        <p
          data-aos="fade-up"
          className="text-gray-400 max-w-2xl mx-auto mt-2"
        >
          Punya pertanyaan? Kirimi saya pesan, dan saya akan segera membalasnya.
        </p>
      </div>

      {/* CONTENT */}
      <div className="py-10 flex justify-center" id="Contact">
        <div className="grid grid-cols-1 lg:grid-cols-[45%_55%] gap-12 w-full">
          {/* FORM */}
          <div
            className="bg-black/50 backdrop-blur-xl rounded-3xl p-10
            border border-red-500/20
            shadow-[0_0_35px_rgba(239,68,68,0.15)]
            hover:shadow-[0_0_45px_rgba(239,68,68,0.35)]
            transition-all duration-500"
          >
            <div className="flex justify-between mb-8">
              <div>
                <h2 className="text-4xl font-bold text-transparent bg-clip-text 
                bg-gradient-to-r from-red-500 to-pink-500">
                  Hubungi
                </h2>
                <p className="text-gray-400 mt-2">
                  Ada yang ingin didiskusikan? Kirim saya pesan.
                </p>
              </div>
              <Share2 className="w-10 h-10 text-red-400 opacity-60" />
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* NAME */}
              <div className="relative group">
                <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-red-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Nama Anda"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl
                  border border-white/20 text-white placeholder-gray-500
                  focus:ring-2 focus:ring-red-500/30
                  hover:border-red-500/40 transition"
                  required
                />
              </div>

              {/* EMAIL */}
              <div className="relative group">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-red-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Anda"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full p-4 pl-12 bg-white/10 rounded-xl
                  border border-white/20 text-white placeholder-gray-500
                  focus:ring-2 focus:ring-red-500/30
                  hover:border-red-500/40 transition"
                  required
                />
              </div>

              {/* MESSAGE */}
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-red-400" />
                <textarea
                  name="message"
                  placeholder="Pesan Anda"
                  value={formData.message}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="w-full resize-none p-4 pl-12 bg-white/10 rounded-xl
                  border border-white/20 text-white placeholder-gray-500
                  focus:ring-2 focus:ring-red-500/30
                  hover:border-red-500/40 transition h-[10rem]"
                  required
                />
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-xl font-semibold
                bg-gradient-to-r from-red-500 to-pink-500
                shadow-[0_0_25px_rgba(239,68,68,0.45)]
                hover:scale-[1.02] active:scale-[0.98]
                transition flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
              </button>
            </form>

            <div className="mt-10 pt-6 border-t border-white/10 flex justify-center">
              <SocialLinks />
            </div>
          </div>

          {/* COMMENT */}
          <div
            className="bg-black/50 backdrop-blur-xl rounded-3xl p-8
            border border-red-500/20
            shadow-[0_0_35px_rgba(239,68,68,0.15)]
            hover:shadow-[0_0_45px_rgba(239,68,68,0.35)]
            transition-all duration-500"
          >
            <Komentar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
