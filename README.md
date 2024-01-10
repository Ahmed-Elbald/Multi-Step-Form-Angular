![Design preview for the Multi-step form coding challenge](./design/desktop-preview.jpg)

<div  align="center">
   <h1>
      Frontend Mentor - Multi-step form
      <br>
      <br>
      <a href="https://www.frontendmentor.io/challenges/multistep-form-YVAnSdqQBJ/hub">Challenge</a>
      <span>|</span>
      <a href="https://www.frontendmentor.io/solutions/mulitstep-form-with-angular-woCXBDbrYW">My Solution</a>
   </h1>
</div>
<br>
<br>

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
   [Joshua Morony's video](https://youtu.be/7SDpTOLeqHE?si=wTS9S5t-O4tRaJ_t) about structuring Angular projects.

2. **Should I use NgRx Global or Component Store?**

   Honestly, I was going to use the Global Store. But again, I imagined what this form would look like inside a large website,
   and how important it might be. I ended up deciding that its state could be managed using the Component Store. I don't know
   if my decision was right especially that my store file is quite long. I would appreciate any feedback concerning that matter.

3. **Structuring the form:**

   Since the form is multi-step, I had to decide how to split those steps... Should they have different routes or may I just use links
   that point to page fragments like `#personal-info` or `#summary`? I finally opted to use fragments as it seemed to me that transitioning
   from step to another does not resemble transitioning among routes, which usually involve changing the whole view. I also used a `StepComponent` that represented the basic structure of all form steps like the header and the content.

## What I Learned

In order to create this form, which is quite complex, I learned some Angular techniques I didn't know about like:

1. Creating custom form controls using the `ControlValueAccessor` Interface.
2. Making reusable input components by providing the `ControlContainer` to the component view.
3. Some important WAI ARIA attributes for forms like `aria-invalid` and `aria-errormessage`.

## Contribution

If you want to make any suggestions, feel free to do that in the [discussions section](https://github.com/Ahmed-Elbald/Multi-Step-Form-Angular/discussions). Also, feel free to clone the repo and play around with the source could.
