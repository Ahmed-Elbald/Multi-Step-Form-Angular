# Frontend Mentor - Multi-step form

![Design preview for the Multi-step form coding challenge](./design/desktop-preview.jpg)

## Intro

This is one of Frontend Mentor's interesting challenges. It's not the first time I tackle it though. I did it about
five month ago. Then, I decided to recreate it after learning Angular. Thus I used HTML, SCSS and Angular.
I've also improved the overall accessibility and my code structure.

## Hard Decisions I Had To Make

Throughout this project, I came across a couple of problems that required taking some hard decisions.
Here are some of them:

1. **Structuring the project folders:**

   At first, I was going to use the `AppComponent` as the main component for the form feature. But then
   I decided that such a form can not be the main feature of an application. So, I've decided to make a separate feature
   called `purchase`, in which I included the whole form. Regarding the structure of each feature's folder, I took that from
   []() about structuring Angular projects.

2. **Should I use NgRx Global or Component Store?**

   Honestly, I was going to use the Global Store. But again, I imagined what this form would look like inside a large website,
   and how important it might be. I ended up deciding that its state could be managed using the Component Store. I don't know
   if my decision was right especially that my store file is quite long. I would appreciate any feedback concerning that matter.

3. **Should I put static data in my store?**

   The original challenge does not require that, but I've separated plans and add-ons data in JSON files, so that I can generate the
   form dynamically. But then I wondered where to put this data... Should I put it in the store or in a service? Or maybe I can just
   store them in a `constants.ts` file and dump my JSON files. Finally, I found out that I can store this static data in my store
   and, still, use it in runtime. For instance, After fetching plans data, I add a `selected` property to each `plan` object to decided
   what the currently selected plan is. I do something quite similar with add-ons.

4. **Structuring the form:**

   Since the form is multi-step, I had to decide how to split those steps... Should they have different routes or may I just use links
   that point to page fragments like `#personal-info` or `#summary`? I finally opted to use fragments as it seemed to me that transitioning
   from step to another does not resemble transitioning among routes, which usually involve changing the whole view. I also used a `StepComponent` that represented the basic structure of all form steps like the header and the content.

## What I Learned

In order to create this form, which is quite complex, I learned some Angular techniques I didn't know about like:

1. Creating custom form controls using the `ControlValueAccessor` Interface.
2. Making reusable input components by providing the `ControlContainer` to the component view.
3. Some important WAI ARIA attributes form forms like `aria-invalid` and `aria-errormessage`.
