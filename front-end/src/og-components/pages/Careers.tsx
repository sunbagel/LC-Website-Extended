import { Disclosure } from '@headlessui/react';
import { useEffect } from 'react';

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "JobPosting",
      "title": "Senior CNC Field Service Engineer",
      "description": "Deliver comprehensive end-to-end service support including on-site installation, commissioning, complex fault diagnosis, precision calibration, and preventive maintenance for high-performance multi-axis CNC machine tools and machining centers.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "LC Industrial Inc.",
        "sameAs": "https://lcindustrial.ca"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1105 Britannia Road East",
          "addressLocality": "Mississauga",
          "addressRegion": "ON",
          "postalCode": "L4W 3X1",
          "addressCountry": "CA"
        }
      },
      "employmentType": "FULL_TIME",
      "datePosted": "2026-10-13",
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Canada"
      }
    },
    {
      "@type": "JobPosting",
      "title": "Electronics Engineering Technologist",
      "description": "Responsible for repairing PCBs down to the component level, refurbishing, and testing. Experience with AC/DC drives, controllers, monitors, circuit boards, and servo drives is essential.",
      "hiringOrganization": {
        "@type": "Organization",
        "name": "LC Industrial Inc.",
        "sameAs": "https://lcindustrial.ca"
      },
      "jobLocation": {
        "@type": "Place",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "1105 Britannia Road East",
          "addressLocality": "Mississauga",
          "addressRegion": "ON",
          "postalCode": "L4W 3X1",
          "addressCountry": "CA"
        }
      },
      "employmentType": "FULL_TIME",
      "datePosted": "2026-10-13",
      "applicantLocationRequirements": {
        "@type": "Country",
        "name": "Canada"
      }
    }
  ]
};

interface JobPostingProps {
  title: string;
  location: string;
  employmentType: string;
  children: React.ReactNode;
}

const JobPosting = ({ title, location, employmentType, children }: JobPostingProps) => (
  <Disclosure>
    {({ open }) => (
      <div className="shadow-lg rounded-lg bg-gray-50 text-black">
        {/* Header row — always visible */}
        <Disclosure.Button className="w-full text-left px-5 pt-5 pb-3 flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg" style={{ color: 'inherit', background: 'none', border: 'none' }}>
          <div className="min-w-0 flex-1">
            <h2 className="font-bold text-xl text-black whitespace-nowrap overflow-hidden text-ellipsis">{title}</h2>
            <p className="text-base text-gray-600 mt-1 font-medium whitespace-nowrap">{location} &middot; {employmentType}</p>
          </div>
          <span className="material-icons-outlined text-2xl flex-shrink-0 ml-4" style={{ color: '#129384' }}>
            {open ? 'expand_less' : 'expand_more'}
          </span>
        </Disclosure.Button>

        {/* Expanded body */}
        <Disclosure.Panel className="px-5 pb-6 border-t border-gray-200 rounded-b-lg">
          {children}
        </Disclosure.Panel>
      </div>
    )}
  </Disclosure>
);

const Careers = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'careers-structured-data';
    script.text = JSON.stringify(structuredData);
    document.head.appendChild(script);
    return () => {
      document.getElementById('careers-structured-data')?.remove();
    };
  }, []);
  return (
    <div className="py-12 bg-grey">
      <div className="container">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-black text-5xl font-bold mb-8">Careers at LC Industrial</h1>

          <div className="space-y-4">

            {/* ── Posting 1 ── */}
            <JobPosting
              title="Senior CNC Field Service Engineer"
              location="Mississauga, ON"
              employmentType="Full-time (30+ hours per week)"
            >
              <h3 className="text-lg mt-4 mb-2 font-semibold">About the Role:</h3>
              <p>We are seeking an experienced <strong>Senior CNC Field Service Engineer</strong> to join our technical
                support team in the Greater Toronto Area. In this role, you will deliver comprehensive, end-to-end
                service support—including on-site installation, commissioning, complex fault diagnosis, precision
                calibration, and preventive maintenance—for high-performance multi-axis CNC machine tools and
                machining centers (including imported European equipment such as TOS, Mecof, Mikromat, GFM or
                similar platforms).</p>
              <p className="mt-2">The ideal candidate brings a strong background in mechatronics, extensive hands-on
                experience with Siemens, Fanuc or other major control systems (Heidenhain, Okuma etc.), and a proven
                track record of CNC equipment in machine shop environments.</p>

              <h3 className="text-lg mt-4 mb-2 font-semibold">Key Responsibilities:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Installation &amp; Commissioning:</strong> Lead on-site mechanical assembly, leveling,
                  electrical integration, and formal acceptance testing for advanced multi-axis machining centers and
                  production machinery.</li>
                <li><strong>Troubleshooting &amp; Maintenance:</strong> Perform root-cause diagnosis and field repair
                  for multi-disciplinary issues involving mechanical (spindles, gearboxes, lead-screws), electrical,
                  hydraulic, and pneumatic systems.</li>
                <li><strong>Precision Calibration:</strong> Execute 5-axis geometric accuracy adjustments, RTCP (Tool
                  Center Point Control) calibration, pitch-error compensation, gantry/master-slave synchronization,
                  and milling-head alignment.</li>
                <li><strong>Control Systems &amp; PLC Servicing:</strong> Perform NC parameter tuning, Fanuc PMC,
                  Siemens PLC modifications (STEP 7 / TIA Portal) and servo drive tuning to improve machine cycle
                  efficiency.</li>
                <li><strong>Client Technical Support:</strong> Work directly with local machine shop clients across
                  the GTA to minimize downtime, resolve parts quality issues, and ensure customer satisfaction.</li>
              </ul>

              <h3 className="text-lg mt-4 mb-2 font-semibold">Qualifications &amp; Technical Skills:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Education:</strong> Bachelor's degree in Mechatronics Engineering, Mechanical Engineering,
                  Electrical Engineering, or equivalent practical trade qualification / engineering background.</li>
                <li><strong>Experience:</strong> 10+ years of hands-on experience in the installation, commissioning,
                  troubleshooting, and repair of multi-axis CNC machine tools.</li>
                <li><strong>Control Systems:</strong> Expert in <strong>Fanuc</strong> or <strong>Siemens 840D / 840D SL</strong>;
                  working knowledge of Okuma, Heidenhain, Mitsubishi, or Fidia etc. controls is highly desirable.</li>
                <li><strong>PLC &amp; Drive Tuning:</strong> Demonstrated capability in modifying Fanuc PMC, Siemens
                  PLC code (STEP 7 / TIA Portal) and tuning servo drives.</li>
                <li><strong>OEM Training &amp; Certification:</strong> Factory service training or certifications from
                  OEM machine tool builders or control manufacturers (e.g., Siemens, Fanuc or equivalent) preferred.</li>
                <li><strong>Field Mobility:</strong> Clean driving record and valid driver's license, and willingness
                  to travel to client facilities across Ontario (mainly GTA) for scheduled service jobs and urgent
                  repairs.</li>
              </ul>

              <h3 className="text-lg mt-4 mb-2 font-semibold">What We Offer:</h3>
              <p>Competitive base compensation, with comprehensive field/travel allowances and overtime eligibility.
                Paid vacation, and company vehicle / mileage reimbursement.</p>

              <h3 className="text-lg mt-4 mb-2 font-semibold">How to Apply:</h3>
              <p>Interested candidates are invited to submit their resume and a cover letter detailing their relevant
                experience to <strong>info@LCindustrial.ca</strong> with the subject line{' '}
                <strong style={{ whiteSpace: 'nowrap' }}>"Senior CNC Field Service Engineer"</strong>.</p>
              <p className="mt-2">Join LC Industrial Inc. and contribute to our mission of providing top-notch CNC and
                industrial electronics services!</p>
            </JobPosting>

            {/* ── Posting 2 ── */}
            <JobPosting
              title="Electronics Engineering Technologist"
              location="Mississauga, ON"
              employmentType="Full-time (30+ hours per week)"
            >
              <h3 className="text-lg mt-4 mb-2 font-semibold">Company Description:</h3>
              <p>LC Industrial Inc. is a CNC and Industrial Electronics Service Provider based in Mississauga, ON. We
                specialize in troubleshooting CNC machines and repairing industrial electronics, including drives,
                motors, encoders, power supplies, industrial PCs, and controllers etc. Our services encompass
                diagnostics, repairs, retrofitting, maintenance, programming, and aftermarket sales. We service brands
                such as Fanuc, Okuma, Siemens, Mitsubishi, Heidenhain, Yaskawa, Allen Bradley, and Fagor.</p>

              <h3 className="text-lg mt-4 mb-2 font-semibold">Job Description:</h3>
              <p>We are seeking an <strong>Electronics Engineering Technologist</strong> responsible for repairing PCBs
                down to the component level, refurbishing, and testing. The ideal candidate must possess a{' '}
                <strong>Bachelor's degree in Electronics or Automation-related fields</strong> and have a minimum of{' '}
                <strong>3 years</strong> of experience in industrial automation or PCB design. Experience with AC/DC
                drives, controllers, monitors, circuit boards, and servo drives is essential.</p>

              <h3 className="text-lg mt-4 mb-2 font-semibold">Responsibilities:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Verify customer complaints and evaluate required repairs.</li>
                <li>Identify defective components and perform repairs on electronic circuit boards.</li>
                <li>Work on PLC &amp; HMI program modifications and VFD and servo drive configurations.</li>
                <li>Use electronic test equipment proficiently, including DMM, oscilloscope, signal generator, and
                  power supplies.</li>
                <li>Read and interpret electrical circuit drawings/blueprints.</li>
                <li>Troubleshoot and modify PLC and HMI systems.</li>
                <li>Perform mechanical and electrical repairs on CNC machines and ensure proper operation.</li>
                <li>Provide detailed and accurate service reports and documentation.</li>
                <li>Travel to customer sites as needed.</li>
                <li>Adhere to workplace safety policies, regulations, and requirements.</li>
              </ul>

              <h3 className="text-lg mt-4 mb-2 font-semibold">Requirements:</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Bachelor's degree in Electronics or Automation-related major.</li>
                <li>Minimum 3 years of experience in industrial automation or PCB design.</li>
                <li>Experience with repairing, servicing, or rebuilding industrial equipment is a plus.</li>
                <li>Proficiency in computer use and Microsoft software.</li>
                <li>Knowledge of ladder logic and PLC programming.</li>
                <li>Ability to reverse engineer customer PCBs if necessary.</li>
                <li>Hands-on experience with soldering, assembly, integration, and testing.</li>
                <li>Excellent English communication skills (oral and written).</li>
                <li>Valid driver's license.</li>
                <li>Ability to lift up to 40 lbs.</li>
                <li>Willingness to work overtime if required.</li>
              </ul>

              <h3 className="text-lg mt-4 mb-2 font-semibold">How to Apply:</h3>
              <p>Interested candidates are invited to submit their resume and a cover letter detailing their relevant
                experience to <strong>info@LCindustrial.ca</strong> with the subject line{' '}
                <strong>"Electronics Engineering Technologist"</strong>.</p>
              <p className="mt-2">Join LC Industrial Inc. and contribute to our mission of providing top-notch CNC and
                industrial electronics services!</p>
            </JobPosting>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
