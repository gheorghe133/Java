public class Table {
    private String brand;

    Table(String brand) {
        this.brand = brand;
    }

    public String getBrand() {
        return brand;
    }

    public void setBrand(String brand) {
        this.brand = brand;
    }

    @Override
    public String toString() {
        return "Table brand{brand='" + brand + "'}";
    }
}
