
declare namespace ImmutableAssign {

    interface IIassignOption {
        freeze?: boolean;                        // Deep freeze both input and output
        freezeInput?: boolean;                   // Deep freeze input
        freezeOutput?: boolean;                  // Deep freeze output
        useConstructor?: boolean;                // Uses the constructor to create new instances
        disableAllCheck?: boolean;
        disableHasReturnCheck?: boolean;
        // Disable validation for extra statements in the getProp() function, 
        // which is needed when running the coverage, e.g., istanbul.js does add 
        // instrument statements in our getProp() function, which can be safely ignored. 
        disableExtraStatementCheck?: boolean;

        // Return the same object if setProp() returns its parameter (i.e., reference pointer not changed).
        ignoreIfNoChange?: boolean;
    }

    type getPropFunc<TObj, TProp, TContext> = (obj: TObj, context: TContext) => TProp;
    type setPropFunc<TProp> = (prop: TProp) => TProp;

    interface IIassign extends IIassignOption {

        // Intellisense for the TObj parameter in getProp will only work if we remove the auto added closing bracket of iassign, 
        // and manually add the closing bracket at last. i.e., 
        //
        //   1. Type iassign( in the editor
        //   2. Most editor will auto complete with closing bracket, e.g., iassign()
        //   3. If we continue to type without removing the closing bracket, e.g., iassign(nested, (n) => n.),
        //      editor such as VS Code will not show any intellisense for "n"
        //   4. We must remove the closing bracket of iassign(), and intellisense will be shown for "n"

        <TObj, TProp, TContext>(
            obj: TObj,
            getProp: getPropFunc<TObj, TProp, TContext>,
            setProp: setPropFunc<TProp>,
            context?: TContext,
            option?: IIassignOption): TObj;

        <TObj>(
            obj: TObj,
            setProp: setPropFunc<TObj>,
            option?: IIassignOption): TObj;

        // functional programming friendly style, moved obj to the last parameter and supports currying
        fp<TObj, TProp, TContext>(
            option: IIassignOption,
            getProp: getPropFunc<TObj, TProp, TContext>,
            setProp: setPropFunc<TProp>,
            context?: TContext,
            obj?: TObj): TObj;

        // In ES6, you cannot set property on imported module directly, because they are default
        // to readonly, in this case you need to use this method.
        setOption(option: IIassignOption): void;
    }
}

//declare function iassign<TObj, TProp, TContext>(obj: TObj, getProp: (obj: TObj, context: TContext) => TProp, setProp: (prop: TProp) => TProp, context?: TContext): TObj;
//export = iassign;

declare module "immutable-assign" {
    let iassign: ImmutableAssign.IIassign;
    export = iassign;
}

declare var iassign: ImmutableAssign.IIassign;
