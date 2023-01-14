import mailChimpClient from "@mailchimp/mailchimp_marketing";
export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { formValues } = req.body;
      console.log({ formValues });
      if (Object.keys(formValues)?.length) {
        const {
          email,
          firstName,
          lastName,
          companyName,
          worksFor,
          howCanWeHelp,
          salesContact,
        } = formValues || {};
        mailChimpClient.setConfig({
          apiKey: process.env.NEXT_PUBLIC_MAILCHIMP_API,
          server: "us18",
        });
        const audienceID = "b2e5108364";

        const addToListResponse = await mailChimpClient.lists.addListMember(
          audienceID,
          {
            email_address: email,
            merge_fields: {
              FNAME: firstName,
              LNAME: lastName,
              EMAIL: email,
              MMERGE3: worksFor,
              MMERGE5: companyName,
              MMERGE4: howCanWeHelp,
              MMERGE6: salesContact,
            },
            status: "subscribed",
            tags: ["media-kit-requested"],
          }
        );
        // https://us18.api.mailchimp.com/3.0/customer-journeys/journeys/437/steps/2321/actions/trigger
        const journeyResponse = await mailChimpClient.customerJourneys.trigger(
          437,
          2321,
          {
            email_address: email,
          }
        );

        console.log(addToListResponse);
        // console.log(journeyResponse);
        res.status(200).json({ addToListResponse });
      } else {
        res.status(500).json({ message: "No form values where found" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({ message: "Method is not allowed" });
  }
}
