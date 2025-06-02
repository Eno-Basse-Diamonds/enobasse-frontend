import Link from "next/link";
import { Metadata } from "next";
import "./styles.scss";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review Eno Basse's terms of service, purchase policies, and website usage guidelines for our luxury jewelry collections.",
  keywords: [
    "jewelry terms and conditions",
    "Eno Basse purchase terms",
    "luxury jewelry policies",
    "online jewelry store terms",
    "fine jewelry legal",
  ],
  openGraph: {
    title: "Terms and Conditions - Eno Basse Fine Diamonds",
    description:
      "Official terms of service for Eno Basse jewelry purchases, website use, and customer agreements.",
    url: "https://www.enobasse.com/terms-and-conditions",
  },
  twitter: {
    title: "Terms and Conditions - Eno Basse Fine Diamonds",
    description:
      "Understand your rights and responsibilities when purchasing Eno Basse fine jewelry.",
  },
  alternates: {
    canonical: "https://www.enobasse.com/terms-and-conditions",
  },
};

export default function TermsAndConditionsPage() {
  return (
    <main className="terms-conditions">
      <h1 className="terms-conditions__title">Terms and Conditions</h1>
      <p className="terms-conditions__last-modified">
        Last modified: June 3, 2025.
      </p>

      <div className="terms-conditions__content">
        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Introduction</h2>
          <p className="terms-conditions__paragraph">
            These terms and conditions apply to the Eno Basse Web site located
            at www.enobasse.com, and all associated Web sites linked to
            www.enobasse.com by Eno Basse, its subsidiaries and affiliates,
            including Eno Basse's sites around the world (collectively 'the
            Site'). Please read these terms and conditions (the 'Terms and
            Conditions') carefully.{" "}
            <strong>
              BY USING THE SITE, YOU AGREE TO BE BOUND BY THESE TERMS AND
              CONDITIONS.
            </strong>
          </p>
          <p className="terms-conditions__paragraph">
            These Terms and Conditions govern your use of, and any purchase
            from, the Eno Basse Site, and constitute an agreement between you
            and Eno Basse. Eno Basse reserves the right to change or modify any
            of these Terms and Conditions or any policy or guideline of the Site
            at any time, and in its sole discretion. Any change or modification
            will be effective immediately upon posting of the revisions on the
            Site. Your continued use of the Site following the posting of its
            changes or modifications will constitute your acceptance of such
            changes or modifications. Therefore, you should frequently review
            these Terms and Conditions and any other applicable policies from
            time-to-time to understand the terms and conditions that apply to
            your use of the Site. If you do not agree to the amended terms, you
            must stop using the Site.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Product Availability</h2>
          <p className="terms-conditions__paragraph">
            On occasion, you may be able to place a product in your shopping
            cart and submit your order for processing, but your order is
            subsequently cancelled due to unavailability of product. You
            acknowledge that products may sell quickly and there may be a short
            period of time after an order has been submitted, but where the
            product is no longer available. You agree that we may cancel your
            order after you have received an Order Confirmation without penalty.
          </p>
          <p className="terms-conditions__paragraph">
            On very rare occasions, you may receive a Shipping Confirmation from
            us, but the product is no longer available in our or our third party
            fulfillment provider's inventory. You agree that we may rescind our
            acceptance and cancel your order without penalty if we are unable to
            ship the product you ordered due to unavailability.
          </p>
          <p className="terms-conditions__paragraph">
            If you're interested in a piece of jewelry that is currently on back
            order, call us and we can tell you when the item will be back in
            stock. Sometimes with the volume of orders we receive, an item may
            go out of stock before we are able to post a notification on the
            Site. If this happens, we will contact you directly to discuss
            possible options.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Pricing</h2>
          <p className="terms-conditions__paragraph">
            Data, including prices, may be inaccurately displayed on our Site
            due to system or typographical errors. While we make every attempt
            to avoid these errors, they may occur. We reserve the right to
            correct any and all errors when they do occur, and we do not honor
            inaccurate or erroneous prices. If a product's listed price is lower
            than its actual price, we will, at our discretion, either contact
            you for instructions before shipping the product or cancel the order
            and notify you of such cancellation. If the order has been shipped,
            you agree to either return the product or pay the difference between
            the actual and charged prices. Our prices are also subject to change
            without notice. We apologize for any inconvenience that this may
            cause. If you have any questions, please do not hesitate to contact
            one of our diamond and jewelry experts at{" "}
            <Link
              href="mailto:info@enobasse.com"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@enobasse.com
            </Link>{" "}
            or{" "}
            <Link
              href="tel:+2349164886579"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 916 488 6579
            </Link>
            .
          </p>
          <p className="terms-conditions__paragraph">
            We do not negotiate prices on our products and all our prices are
            final.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Payment Information</h2>
          <p className="terms-conditions__paragraph">
            After you have selected your jewelry and provided shipping
            information, you will see a prompt for your payment details, such as
            your credit card information and any promotional codes or gift cards
            you may have. By entering your payment information and submitting
            your order, you authorize us and our third party payment processors
            to charge the amount of the order to your selected payment method.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Diamond Certificates</h2>
          <p className="terms-conditions__paragraph">
            When you order a loose diamond, we ship it to you with the
            accompanying diamond grading report (also called a diamond
            certificate). These grading reports are detailed documents created
            by diamond grading experts at one of two highly-respected diamond
            laboratories - making it very expensive to replace a diamond grading
            report. Because of this, we require each diamond grading report to
            be included with each returned diamond. If you do not include the
            diamond grading report with your return, you will be charged a
            replacement fee of US$150 (or equivalent amount in other
            currencies).
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Comparison Purchasing</h2>
          <p className="terms-conditions__paragraph">
            To keep our prices low, we do not allow comparison purchasing.
            Comparison purchasing is the act of buying several items with the
            intent of keeping the one you like best and returning the remainder.
            This causes undue restocking and inventory overhead and can be very
            costly. To confirm the quality of a jewelry item, please contact one
            of our diamond and jewelry experts at{" "}
            <Link
              href="mailto:info@enobasse.com"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@enobasse.com
            </Link>
            or ,{" "}
            <Link
              href="tel:+2349164886579"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 916 488 6579
            </Link>
            , and we would be happy to help you make your choice.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Information On Our Site</h2>
          <p className="terms-conditions__paragraph">
            At Eno Basse, we make every attempt to ensure that our online
            catalog is as accurate and complete as possible. In order to give
            you the opportunity to view our products in great detail, some
            products may appear larger or smaller than their actual size in our
            photographs; and since every computer monitor is set differently,
            color and size may vary slightly.
          </p>
          <p className="terms-conditions__paragraph">
            Our objective is to provide you with as much information and detail
            about your prospective purchase as possible so that you can see the
            beauty and shape of a particular item. In compliance with industry
            standards and FTC regulations, Eno Basse states that carat total
            weight in all purchases may vary 0.05 carats from stated weight.
          </p>
          <p className="terms-conditions__paragraph">
            On the Site, we provide the measurement of our products based on our
            manufacturing specifications. Slight tolerances may be accounted for
            based on finishing during the manufacturing. Width tolerance on
            machine made wedding bands of 0.20mm is allowed. Cast manufactured
            rings can vary slightly more.
          </p>
          <p className="terms-conditions__paragraph">
            For gemstone and pearl measurements, a tolerance of 0.25mm is
            allowed.
          </p>
          <p className="terms-conditions__paragraph">
            For diamond jewelry set with multiple diamonds, we provide the
            minimum total carat weight for the piece. Color and clarity grades
            are expressed as either a minimum or an average depending on the
            number of diamonds. If stated as a minimum, all diamonds within the
            piece are at or above the stated quality. If expressed as an
            average, collectively the quality is equal to or exceeds the grade
            stated.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">
            Policy On Ethical Sourcing
          </h2>
          <p className="terms-conditions__paragraph">
            At Eno Basse, we only purchase diamonds through the largest and most
            respected suppliers who, like us, proudly adhere to and enforce the
            standards established by the Kimberley Process, an international
            system that polices the trade of diamonds to ensure they are from
            sources free of conflict. Read more about Eno Basse's policy on
            ethical sourcing and the steps we take to ensure our diamonds are
            from conflict free sources.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Privacy Policy</h2>
          <p className="terms-conditions__paragraph">
            Please refer to our{" "}
            <Link href="/terms-conditions" className="terms-conditions__link">
              Privacy Policy
            </Link>{" "}
            for information on how Eno Basse collects, uses, and discloses
            personally identifiable information from its customers.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Site Content </h2>
          <p className="terms-conditions__paragraph">
            The Site and all content and other materials, including, without
            limitation, the Eno Basse logo, and all designs, text, graphics,
            pictures, selection, coordination, 'look and feel', information,
            data, software, sound files, other files and the selection and
            arrangement thereof (collectively, the "Site Materials") are the
            proprietary property of Eno Basse or its licensors or users and are
            protected by trade dress, copyright, patent and trademark laws, and
            various other intellectual property rights and unfair competition
            laws.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Trademarks</h2>
          <p className="terms-conditions__paragraph">
            Eno Basse, Build Your Own Ring, Build Your Own Three-Stone Ring,
            Build Your Own Earrings, Build Your Own Diamond Pendant, the Eno
            Basse logos, and any other product or service name or slogan
            contained in our Site are trademarks of Eno Basse and its suppliers
            or licensors, and may not be copied, imitated or used, in whole or
            in part, without the prior written permission of Eno Basse or the
            applicable trademark holder. You may not use any metatags or any
            other "hidden text" utilizing "Eno Basse" or any other name,
            trademark or product or service name of Eno Basse without our prior
            written permission. All other trademarks, registered trademarks,
            product names and Eno Basse names or logos mentioned in our Site are
            the property of their respective owners.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Use Of The Site</h2>
          <p className="terms-conditions__paragraph">
            You are granted a personal, limited, non-sublicensable license to
            access and use our Site and electronically copy, (except where
            prohibited without a license) and print to hard copy portions of our
            Site Materials for your informational, non-commercial and personal
            use only.
          </p>
          <p className="terms-conditions__paragraph">
            Such license is subject to these Terms and Conditions and does not
            include: (a) any resale or commercial use of our Site or the Site
            Materials therein; (b) the collection and use of any product
            listings, pictures or descriptions for commercial purposes; (c) the
            distribution, public performance or public display of any Site
            Materials, (d) modifying or otherwise making any derivative uses of
            our Site and the Site Materials, or any portion thereof; (e) use of
            any automated means to access, monitor or interact with any portion
            of our Site, including through data mining, robots, spiders,
            scraping, or similar data gathering or extraction methods; (f)
            downloading (other than the page caching) of any portion of our
            Site, the Site Materials or any information contained therein,
            except as expressly permitted on our Site; (g) cause to appear any
            pop-up, pop-under, exit windows, expanding buttons, banners,
            advertisement, or anything else which minimizes, covers, or frames
            or inhibits the full display of our Site; (h) use our web sites in
            any way which interferes with the normal operation of our sites; or
            (i) any use of our Site or the Site Materials other than for its
            intended purpose.
          </p>
          <p className="terms-conditions__paragraph">
            Any use of our Site or the Site Materials other than as specifically
            authorized herein, without the prior written permission of Eno
            Basse, is strictly prohibited and will terminate the license granted
            herein. Such unauthorized use may also violate applicable laws,
            including without limitation copyright and trademark laws and
            applicable communications regulations and statutes. Unless
            explicitly stated herein, nothing in these Terms and Conditions
            shall be construed as conferring any license to intellectual
            property rights, whether by estoppel, implication, or otherwise.
            This license is revocable at any time.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Infringer Policy</h2>
          <p className="terms-conditions__paragraph">
            In accordance with the Digital Millennium Copyright Act (DMCA) and
            other applicable law, Eno Basse has adopted a policy of terminating
            and barring, in appropriate circumstances and at Eno Basse's sole
            discretion, site users or account holders who are deemed to be
            repeat infringers. Eno Basse may also at its sole discretion limit
            access to this site and/or terminate the accounts of any users who
            infringe any intellectual property rights of others, whether or not
            there is any repeat infringement.
          </p>
          <p className="terms-conditions__paragraph">
            If you believe that your work has been copied and is accessible on
            the Site in a way that constitutes copyright infringement, you may
            notify Eno Basse by providing the following information (as required
            by the Online Copyright Infringement Liability Limitation Act of the
            Digital Millennium Copyright Act, 17 U.S.C. § 512) to{" "}
            <Link
              href="mailto:info@enobasse.com"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@enobasse.com
            </Link>
          </p>
          <ul className="terms-conditions__list">
            <li className="terms-conditions__list-item">
              A physical or electronic signature of a person authorized to act
              on behalf of the owner of an exclusive right that is allegedly
              infringed;{" "}
            </li>
            <li className="terms-conditions__list-item">
              A description of the copyrighted work claimed to have been
              infringed, or if multiple copyrighted works at a single online
              site are covered by a single notification, a representative list
              of such works at that site;{" "}
            </li>
            <li className="terms-conditions__list-item">
              Identification of the material that is claimed to be infringing or
              to be the subject of infringing activity and that is to be removed
              or access to which is to be disabled, and information reasonably
              sufficient to permit Eno Basse to locate the material;{" "}
            </li>
            <li className="terms-conditions__list-item">
              Information reasonably sufficient to permit Eno Basse to contact
              the complaining party, such as an address, telephone number and an
              electronic mail address at which the complaining party may be
              contacted;
            </li>
            <li className="terms-conditions__list-item">
              A statement that the complaining party has a good faith belief
              that use of the material in the manner complained of is not
              authorized by the copyright owner, its agent or the law; and
            </li>
            <li className="terms-conditions__list-item">
              {" "}
              A statement that the information in the notification is accurate,
              and under penalty of perjury, that the complaining party is
              authorized to act on behalf of the owner of an exclusive right
              that is allegedly infringed.
            </li>
          </ul>
          <p className="terms-conditions__paragraph">
            Inquiries that do not comply with all of the requirements of 17
            U.S.C. § 512 may not be effective.
          </p>
          <p className="terms-conditions__paragraph">
            Please be aware that if you knowingly materially misrepresent that
            material or activity on the Site is infringing your copyright, you
            may be held liable for damages (including costs and attorneys’ fees)
            under 17 U.S.C. § 512(f).
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Third Party Content</h2>
          <p className="terms-conditions__paragraph">
            Eno Basse may provide links to Web pages and content of third
            parties ('Third Party Content') as a service to those interested in
            this information. Eno Basse does not monitor or have any control
            over any Third Party Content or third party Sites. Eno Basse does
            not endorse any Third Party Content and can make no guarantee as to
            its accuracy or completeness. Eno Basse does not represent or
            warrant the accuracy of any information contained therein, and
            undertakes no responsibility to update or review any Third Party
            Content. Users use these links and Third Party Content contained
            therein at their own risk.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">
            Advertisements And Promotions
          </h2>
          <p className="terms-conditions__paragraph">
            Eno Basse may run advertisements and promotions from third parties
            on our Site. Your business dealings or correspondence with, or
            participation in promotions of, advertisers other than Eno Basse,
            and any terms, conditions, warranties, or representations associated
            with such dealings, are solely between you and such third party. Eno
            Basse is not responsible or liable for any loss or damage of any
            sort incurred as the result of any such dealings or as the result of
            the presence of such non-Eno Basse advertisers on our Site.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Submissions</h2>
          <p className="terms-conditions__paragraph">
            You acknowledge and agree that any materials, including but not
            limited to questions, comments, suggestions, ideas, plans, notes,
            drawings, original or creative materials or other information,
            regarding this site, Eno Basse, or our products or services that are
            provided by you to Eno Basse are non-confidential and shall become
            the sole property of Eno Basse. Eno Basse will own exclusive rights,
            including all intellectual property rights, and will be entitled to
            the unrestricted use and dissemination of these materials for any
            purpose, commercial or otherwise, without acknowledgment or
            compensation to you.
          </p>
          <p className="terms-conditions__paragraph">
            You grant Eno Basse and its affiliates and sublicensees the right to
            use the name that you submit in connection with such content, if
            they choose. You represent and warrant that (a) you own and control
            all of the rights to the content that you submit, or that you
            otherwise have the right to submit such content to this site; (b)
            the content is accurate and not misleading; and (c) use and posting
            of the content you supply will not violate any rights of or cause
            injury to any person or entity.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">
            Product Reviews And User Content
          </h2>
          <p className="terms-conditions__paragraph">
            Our Site includes a product review feature, and includes or may
            include in the future discussion forums, user generated content, or
            other areas or services in which you or third parties create, post,
            or store any content, messages, materials or other items on our Site
            ('Interactive Areas'). You are solely responsible for your use of
            such Interactive Areas and use them at your own risk. By using any
            Interactive Areas, you agree not to post, upload to, transmit,
            distribute, store, create or otherwise publish through our Site any
            of the following:
          </p>

          <ol className="terms-conditions__list">
            <li className="terms-conditions__list-item">
              Any message, data, information, text, music, sound, photos, video,
              graphics, code or other material ('User Content') that is
              unlawful, libelous, defamatory, obscene, pornographic, indecent,
              lewd, suggestive, harassing, threatening, invasive of privacy or
              publicity rights, abusive, inflammatory, fraudulent or otherwise
              objectionable.
            </li>
            <li className="terms-conditions__list-item">
              User Content that would constitute, encourage or provide
              instructions for a criminal offense, violate the rights of any
              party, or that would otherwise create liability or violate any
              local, state, national or international law, including, without
              limitation, the regulations of the U.S. Securities and Exchange
              Commission or any rules of a securities exchange such as the New
              York Stock Exchange, the American Stock Exchange or the NASDAQ.
            </li>
            <li className="terms-conditions__list-item">
              User Content that may infringe any patent, trademark, trade
              secret, copyright or other intellectual or proprietary right of
              any party. By posting any User Content, you represent and warrant
              that you have the lawful right to distribute and reproduce such
              User Content.
            </li>
            <li className="terms-conditions__list-item">
              User Content that impersonates any person or entity or otherwise
              misrepresents your affiliation with a person or entity;
            </li>
            <li className="terms-conditions__list-item">
              Unsolicited promotions, political campaigning, advertising, or
              solicitations.
            </li>
            <li className="terms-conditions__list-item">
              Private information of any third party, including, without
              limitation, addresses, phone numbers, email addresses, Social
              Security numbers, and credit card numbers.
            </li>
            <li className="terms-conditions__list-item">
              Viruses, corrupted data, or other harmful, disruptive, or
              destructive files.
            </li>
            <li className="terms-conditions__list-item">
              User Content that, in the sole judgment of Eno Basse, is
              objectionable or which restricts or inhibits any other person from
              using or enjoying the Interactive Areas or our Site, or which may
              expose Eno Basse or its users to any harm or liability of any
              type.
            </li>
          </ol>

          <p className="terms-conditions__paragraph">
            Eno Basse takes no responsibility and assumes no liability for any
            User Content posted, stored, or uploaded by you or any third party,
            or for any loss or damage thereto, nor is Eno Basse liable for any
            mistakes, defamation, slander, libel, omissions, falsehoods,
            obscenity, pornography or profanity you may encounter. Your use of
            Interactive Areas is at your own risk. As a provider of interactive
            services, Eno Basse is not liable for any statements,
            representations, or User Content provided by its users in any public
            forum, personal home page, or other Interactive Area.
          </p>

          <p className="terms-conditions__paragraph">
            Although Eno Basse has no obligation to screen, edit, or monitor any
            of the Content posted in any Interactive Area, Eno Basse reserves
            the right, and has absolute discretion, to remove, screen, or edit
            any User Content posted or stored on our Site at any time and for
            any reason without notice, and you are solely responsible for
            creating backup copies of and replacing any User Content you post or
            store on our Site at your sole cost and expense.
          </p>

          <p className="terms-conditions__paragraph">
            Any use of the Interactive Areas or other portions of our Site in
            violation of the foregoing violates these Terms and Conditions and
            may result in, among other things, termination or suspension of your
            rights to use the Interactive Areas and/or our Site. In order to
            cooperate with legitimate governmental requests, subpoenas, or court
            orders, to protect Eno Basse's systems and customers, or to ensure
            the integrity and operation of Eno Basse's business and systems, Eno
            Basse may access and disclose any information it considers necessary
            or appropriate, including, without limitation, user profile
            information (i.e. name, e-mail address, etc.), IP addressing and
            traffic information, usage history, and posted User Content. Eno
            Basse's right to disclose any such information shall govern over any
            terms of Eno Basse's Privacy Policy.
          </p>

          <p className="terms-conditions__paragraph">
            If you post User Content to our Site, unless we indicate otherwise,
            you grant Eno Basse and its affiliates a nonexclusive, royalty-free,
            perpetual, irrevocable and fully sublicensable right to use,
            reproduce, modify, adapt, publish, translate, create derivative
            works from, distribute, perform and display such User Content
            throughout the world in any media. You grant Eno Basse and its
            affiliates and sublicensees the right to use the name that you
            submit in connection with such content, if they choose. You
            represent and warrant that (a) you own and control all of the rights
            to the User Content that you post or you otherwise have the right to
            post such User Content to our Site; (b) the User Content is accurate
            and not misleading; and (c) use and posting of the User Content you
            supply does not violate these Terms and Conditions and will not
            violate any rights of or cause injury to any person or entity.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">
            SMS Terms And Conditions
          </h2>
          <p className="terms-conditions__paragraph">
            By signing up for Eno Basse’s Shipping Status Notifications text
            messages, You agree to receive periodic transactional text messages
            from Eno Basse. These messages are intended to update you about the
            status of your order, and will be sent after you have made a
            purchase when that order status has changed.
          </p>

          <p className="terms-conditions__paragraph">
            This is a standard rate SMS/MMS program and message and data rates
            may apply. Carriers are not liable for delayed or undelivered
            messages.
          </p>

          <p className="terms-conditions__paragraph">
            To opt-out, text STOP to the five-digit short code from which you
            received a message. After opting out, you will receive a one-time
            confirmatory text message acknowledging that you have been opted out
            of receiving further text messages.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Indemnification</h2>
          <p className="terms-conditions__paragraph">
            You agree to defend, indemnify and hold harmless Eno Basse, its
            independent contractors, service providers and consultants, and
            their respective directors, employees and agents, from and against
            any claims, damages, costs, liabilities, and expenses (including,
            but not limited to, reasonable attorneys' fees) arising out of or
            related to any Content you post, store or otherwise transmit on or
            through our Site or your use of or inability to use our Site,
            including without limitation any actual or threatened suit, demand
            or claim made against Eno Basse and/or its independent contractors,
            service providers, employees, directors or consultants, arising out
            of or relating to the Content, your conduct, your violation of these
            Terms and Conditions or your violation of the rights of any third
            party.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Disclaimer Of Warranty</h2>
          <p className="terms-conditions__paragraph">
            EXCEPT AS EXPRESSLY PROVIDED TO THE CONTRARY IN A WRITING BY ENO
            BASSE, THIS SITE, THE CONTENT CONTAINED THEREIN AND THE PRODUCTS AND
            SERVICES PROVIDED ON OR IN CONNECTION THEREWITH (THE "PRODUCTS AND
            SERVICES") ARE PROVIDED ON AN "AS IS" BASIS WITHOUT WARRANTIES OF
            ANY KIND, EITHER EXPRESS OR IMPLIED. ENO BASSE DISCLAIMS ALL OTHER
            WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, WITHOUT LIMITATION,
            IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
            PURPOSE, TITLE, AND NON-INFRINGEMENT AS TO THE INFORMATION, CONTENT,
            AND MATERIALS IN OUR SITE. ENO BASSE DOES NOT REPRESENT OR WARRANT
            THAT MATERIALS IN OUR SITE OR THE SERVICES ARE ACCURATE, COMPLETE,
            RELIABLE, CURRENT OR ERROR-FREE. ENO BASSE DOES NOT REPRESENT OR
            WARRANT THAT OUR SITE OR ITS SERVERS ARE FREE OF VIRUSES OR OTHER
            HARMFUL COMPONENTS.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Limitation Of Liability</h2>
          <p className="terms-conditions__paragraph">
            IN NO EVENT SHALL ENO BASSE, ITS DIRECTORS, MEMBERS, EMPLOYEES OR
            AGENTS BE LIABLE FOR ANY DIRECT, SPECIAL, INDIRECT, OR CONSEQUENTIAL
            DAMAGES, OR ANY OTHER DAMAGES OF ANY KIND, INCLUDING BUT NOT LIMITED
            TO LOSS OF USE, LOSS OF PROFITS, OR LOSS OF DATA, WHETHER IN AN
            ACTION IN CONTRACT, TORT (INCLUDING BUT NOT LIMITED TO NEGLIGENCE)
            OR OTHERWISE, ARISING OUT OF OR IN ANY WAY CONNECTED WITH THE USE OF
            OUR SITE, THE PRODUCTS AND SERVICES, OR THE CONTENT CONTAINED IN OR
            ACCESSED THROUGH OUR SITE, INCLUDING WITHOUT LIMITATION ANY DAMAGES
            CASED BY OR RESULTING FROM RELIANCE BY USER ON ANY INFORMATION
            OBTAINED FROM ENO BASSE, OR THAT RESULT FROM MISTAKES, OMISSIONS,
            INTERRUPTIONS, DELETION OF FILES OR EMAIL, ERRORS, DEFECTS, VIRUSES,
            DELAYS IN OPERATION OR TRANSMISSION OR ANY FAILURE OF PERFORMANCE,
            WHETHER OR NOT RESULTING FROM ACTS OF GOD, COMMUNICATIONS FAILURE,
            THEFT, DESTRUCTION OR UNAUTHORIZED ACCESS TO ENO BASSE'S RECORDS,
            PROGRAMS OR SERVICES.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">
            Applicable Law And Venue
          </h2>
          <p className="terms-conditions__paragraph">
            These Terms and Conditions and your use of this site will be
            governed by and construed in accordance with the laws of the State
            of Washington, applicable to agreements made and to be entirely
            performed within the State of Washington, without resort to its
            conflict of law provisions. You agree that any action at law or in
            equity arising out of or relating to these Terms and Conditions
            shall be filed only in the state and federal courts located in King
            County, Washington and you hereby irrevocably and unconditionally
            consent and submit to the exclusive jurisdiction of such courts over
            any suit, action or proceeding arising out of your use of this site,
            any purchase from this site, or these Terms and Conditions.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Modification And Notice</h2>
          <p className="terms-conditions__paragraph">
            You agree that Eno Basse may modify these Terms and Conditions and
            any other policies on our Site at any time and that posting the
            modified Terms and Conditions or policies on our Site will
            constitute sufficient notice of such modification.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Termination</h2>
          <p className="terms-conditions__paragraph">
            Notwithstanding any of these Terms and Conditions, Eno Basse
            reserves the right, without notice and in its sole discretion, to
            terminate your license to use this site, and to block or prevent
            future your access to and use of the Site.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Severability</h2>
          <p className="terms-conditions__paragraph">
            If any provision of these Terms and Conditions shall be deemed
            unlawful, void or for any reason unenforceable, then that provision
            shall be deemed severable from these Terms and Conditions and shall
            not affect the validity and enforceability of any remaining
            provisions.
          </p>
        </section>

        <section className="terms-conditions__section">
          <h2 className="terms-conditions__heading">Contact Us</h2>
          <p className="terms-conditions__paragraph">
            If you have any questions about these Terms and Conditions, please
            contact us at{" "}
            <Link
              href="mailto:info@enobasse.com"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              info@enobasse.com
            </Link>
            ,{" "}
            <Link
              href="tel:+2349164886579"
              className="terms-conditions__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              +234 916 488 6579
            </Link>
            , or{" "}
            <Link
              href="https://www.google.com/search?sca_esv=2fa4110dc5a9b4b6&rlz=1C1GCEU_enNG1161NG1161&sxsrf=AE3TifPzAC7YZrNK0Pe8khDAgNMzcMiZWg:1748787201283&q=Admiralty+Mall+Lekki&ludocid=16645864384511966876&lsig=AB86z5UgHAChSHfgbFgwATQi8D5M&sa=X&ved=2ahUKEwj5jq7_s9CNAxUtQEEAHTsdPRIQ8G0oAHoECEMQAQ&biw=1536&bih=776&dpr=1.25"
              target="_blank"
              rel="noopener noreferrer"
              className="terms-conditions__link"
            >
              Admiralty Mall, Lekki Phase 1, Lekki, Lagos.
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
}
