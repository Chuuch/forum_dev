import { Button } from "../ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../ui/card";

export default function NewsArticle() {
    const articleContent = "SoFi customers will be able to buy, sell, and hold crypto assets in their accounts, and the firm plans to eventually expand into stablecoin offerings and add the ability to borrow against crypto, according to a waitlist notice on its website. The firm will provide members with \"the ability to borrow against their assets, expanding payment options, and introducing new staking features,\" it stated. SoFi CEO Anthony Noto said he was \"very excited\" about the innovation the firm can drive using blockchain and crypto across its businesses, adding that \"SoFi's planned new international payments (frequently called remittances) will convert fiat to crypto, transmit via blockchain, and convert to local fiat.\"";

    const truncatedContent = articleContent.length > 200
        ? articleContent.substring(0, 200) + "..."
        : articleContent;

    const handleViewArticle = () => {
        // TODO: Implement navigation to article view
        console.log("Navigate to article view");
    };

    return (
        <Card className="flex flex-col items-start justify-start w-full min-w-1/3 h-full bg-transparent backdrop-blur-lg rounded-xl relative cursor-pointer hover:border-teal-300 hover:border-1 transition-all duration-300">
            <CardHeader className="w-full min-h-2/5 rounded-t-xl absolute top-0 left-0" style={{ backgroundImage: "url(block2.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }}>
            </CardHeader>
            <CardContent className="flex flex-col items-start justify-start h-full text-gray-400 px-6 pt-40">
                <CardTitle className="w-full flex relative z-10 text-gray-300/80 mb-4">
                    <h1 className="text-left text-xl font-bold">SoFi eyes stablecoin offerings too</h1>
                </CardTitle>
                <div className="flex flex-col h-full justify-between">
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-4">
                        {truncatedContent}
                    </p>
                </div>
                <CardFooter className="w-full flex justify-center">
                    <Button
                        variant="link"
                        onClick={handleViewArticle}
                        className="text-teal-300 text-sm font-medium mt-4 cursor-pointer hover:no-underline no-underline"
                    >
                        Към статията →
                    </Button>
                </CardFooter>
            </CardContent>
        </Card>
    );
}