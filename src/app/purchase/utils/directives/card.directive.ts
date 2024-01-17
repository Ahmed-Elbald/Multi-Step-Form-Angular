import { Directive, ElementRef, HostBinding, HostListener, Input, OnInit, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[formCard]',
  standalone: true
})
export class CardDirective implements OnInit {

  @HostListener("mouseenter") handleMouseEnter() {
    this.highlightBorder = true;
  }

  @HostListener("mouseleave") handleMouseLeave() {
    this.highlightBorder = false;
  }

  @HostBinding("style.backgroundColor") get outlineClr() {
    return this.highlightBg ? this.bgHighlightClr : "transparent"
  }

  @HostBinding("style.borderColor") get BorderClr() {
    return this.highlightBorder || this.highlightBg ? this.borderHighlightClr : this.borderDefaultClr
  }

  // Deps
  private renderer = inject(Renderer2);

  // Input variables
  @Input() public highlightBg: boolean = false;

  // Private fields
  private borderDefaultClr = "hsl(var(--clr-neu-400))"
  private borderHighlightClr = "hsl(var(--clr-acc-500) / 0.75)";
  private bgHighlightClr = "hsl(var(--clr-neu-300))"

  private highlightBorder = false;

  // Public methods
  constructor(private host: ElementRef) { }

  ngOnInit(): void {
    this.renderer.setStyle(this.host.nativeElement, "display", "block");
    this.renderer.setStyle(this.host.nativeElement, "border-radius", "10px");
    this.renderer.setStyle(this.host.nativeElement, "border", `1px solid ${this.borderDefaultClr}`);
  }

}